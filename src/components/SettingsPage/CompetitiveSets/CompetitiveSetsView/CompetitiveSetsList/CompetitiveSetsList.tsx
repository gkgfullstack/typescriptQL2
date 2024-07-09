import React, { useEffect, useState } from 'react';
import CompetitiveSetsTable from 'src/components/SettingsPage/CompetitiveSets/CompetitiveSetsView/CompetitiveSetsList/CompetitiveSetsTable';
import styles from './CompetitiveSetsList.module.less';
import SORT_ORDER from 'src/enums/sortOrder';
import { Sorting } from 'src/types/Sorting';
import { CompetitiveSetInfo } from 'src/types/CompetitiveSetInfo';
import CreateCompetitiveSets from 'src/components/SettingsPage/CompetitiveSets/CompetitiveSetsView/CreateCompetitiveSets';
import ConfirmationDownloadCentered from 'src/components/common/ConfirmationDownloadCentered';

type CompetitiveSetsListProps = {
  requestParams: any;
  setRequestParams: any;
  loading: boolean;
  totalRecords: number;
  competitiveSetsList: any;
  setRequestDeleteParams:any;
  competitiveDelete:any;
};

const DEFAULT_PAGE_SIZE = 10;
const PAGE_NUMBER = 0;

const CompetitiveSetsList: React.FC<CompetitiveSetsListProps> = ({
  requestParams,
  setRequestParams,
  loading,
  totalRecords,
  competitiveSetsList,
  setRequestDeleteParams,
}: CompetitiveSetsListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('name');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<CompetitiveSetInfo>);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [confirmationVisibleDelete, setConfirmationVisibleDelete] = useState<boolean>(false);
  const [record, setRecord] = useState<CompetitiveSetInfo | undefined>(undefined);

  const getOffset = (page: number, size: number): string => {
    let offset: string = PAGE_NUMBER.toString();
    if (requestParams && requestParams.size && requestParams.size !== pageSize.toString()) {
      setPage(PAGE_NUMBER);
      return offset;
    }
    offset = (page > 1 ? (page - 1) * size : PAGE_NUMBER).toString();
    return offset;
  };

  useEffect(() => {
    let newParams: any = {
      size: pageSize.toString(),
      offset: getOffset(page, pageSize),
    };
    if (sorting) {
      newParams = {
        ...newParams,
        sortOrder: SORT_ORDER[sorting.order],
        sortColumn: sorting.field,
      };
    }
    setRequestParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, sorting]);

  const onSortingChange = (sorting: Sorting<CompetitiveSetInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  const onAction = (record: CompetitiveSetInfo, type: string) => {
    if (type === 'edit') {
      setVisibleModal(true);
      setRecord(record);
    }
    if (type === 'delete') {
      setConfirmationVisibleDelete(true);
      setRecord(record);
    }
  };
  const onDelete = () => {
    setRequestDeleteParams(record?.id);
    setConfirmationVisibleDelete(false);
  };
  return (
    <div className={styles.competitive_sets_list}>
      <CompetitiveSetsTable
        onSortingChange={onSortingChange}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        total={totalRecords}
        items={competitiveSetsList}
        sorting={sorting}
        loading={loading}
        pageSize={pageSize}
        page={page}
        onAction={onAction}
      />
      <ConfirmationDownloadCentered
        title={'Delete Table Row '}
        name={record?.name === undefined ? "" : record?.name}
        confirmationVisible={confirmationVisibleDelete}
        onAction={onDelete}
        setVisible={setConfirmationVisibleDelete}
        message={"Are you sure you want to delete this table, including all of its data?"}
      />
      <CreateCompetitiveSets record={record} isEditable visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
    </div>
  );
};

export default CompetitiveSetsList;
