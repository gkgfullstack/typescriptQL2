import React, { useEffect, useState } from 'react';
import styles from './ConfigureClientList.module.less';
import { Sorting } from 'src/types/Sorting';
import ConfigureClientListTable from './ConfigureClientListTable/ConfigureClientListTable';
import ConfigureClientTableInfo from 'src/types/ConfigureClientTableInfo';
import { useGetConfigureClientList } from 'src/api/configureClientList';
import SORT_ORDER from 'src/enums/sortOrder';
import { useEditConfigureClient } from 'src/api/createNewConfigureClient';

export type ConfigureClientListProps = {
  name?: string;
  industry?: string;
  mwsSchema?: string;
  pageSize: number;
  page: number;
  setPageSize?: any;
  setPage?: any;
};

const ConfigureClientList: React.FC<ConfigureClientListProps> = ({
  name,
  industry,
  mwsSchema,
  pageSize,
  page,
  setPageSize,
  setPage,
}: ConfigureClientListProps): React.ReactElement => {
  const [currentColumn] = useState('name');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<
    ConfigureClientTableInfo
  >);
  const [requestParams, setRequestParams] = useState<any>(null);
  const [loading, totalRecords, clientList] = useGetConfigureClientList(requestParams);
  const [editRecord, setEditRecord] = useState(null);
  useEditConfigureClient(editRecord, requestParams, setRequestParams);

  const getOffset = (page: number, size: number): number => {
    const firstPage = 0;

    if (
      requestParams &&
      ((requestParams.name && requestParams.name !== name) ||
        (!requestParams.name && name) ||
        (requestParams.mwsschema && requestParams.mwsschema !== mwsSchema) ||
        (!requestParams.mwsschema && mwsSchema) ||
        (requestParams.industry && requestParams.industry !== industry) ||
        (!requestParams.industry && industry) ||
        (requestParams.size && requestParams.size !== pageSize))
    ) {
      setPage(firstPage);
      return firstPage;
    }

    return page > 1 ? (page - 1) * size : firstPage;
  };

  useEffect(() => {
    let newParams: any = { size: pageSize, offset: getOffset(page, pageSize) };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field,
      };
    }
    if (name) {
      newParams = { ...newParams, name };
    }
    if (mwsSchema) {
      newParams = { ...newParams, mwsschema: mwsSchema };
    }
    if (industry) {
      newParams = { ...newParams, industry };
    }
    setRequestParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, industry, mwsSchema, page, pageSize, sorting]);

  const onChangeStatus = (record: any) => {
    return (e: any) => {
      const newRecord = {
        ...record,
        active: !record.active,
      };
      e.stopPropagation();
      setEditRecord(newRecord);
    };
  };

  const onSortingChange = (sorting: Sorting<ConfigureClientTableInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  return (
    <div className={styles.client_list_table_wrapper}>
      <ConfigureClientListTable
        items={clientList}
        sorting={sorting}
        loading={loading}
        pageSize={pageSize}
        page={page}
        total={totalRecords || 0}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        onSortingChange={onSortingChange}
        onChangeStatus={onChangeStatus}
      />
    </div>
  );
};

export default ConfigureClientList;
