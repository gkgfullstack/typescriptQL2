import React, { useEffect, useState } from 'react';
import styles from './ShallowProductList.module.less';
import { Sorting } from 'src/types/Sorting';
import ShallowProductListTable from './ShallowProductListTable';
import ShallowProductTableInfo from 'src/types/ShallowProductTableInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import {
  useDeleteProductFromShallow,
  useGetShallowCleanupList,
  useExportShallowCleanup,
} from 'src/api/shallowCleanupList';

export type ShallowProductListProps = {
  date?: string;
  site?: string;
  schema?: string;
};

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_NUMBER = 0;

const ShallowProductList: React.FC<ShallowProductListProps> = ({
  schema,
  site,
  date,
}: ShallowProductListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('outdatedRecords');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<
    ShallowProductTableInfo
  >);
  const [requestParams, setRequestParams] = useState<any>(null);
  const [loading, totalRecords, productList] = useGetShallowCleanupList(requestParams);
  const [isExport, setExport] = useState(false);
  const [exportLoading, file] = useExportShallowCleanup(requestParams, isExport, setExport);

  const getOffset = (page: number, size: number): number => {
    if (
      requestParams &&
      ((requestParams.siteIds && requestParams.siteIds !== site) ||
        (!requestParams.siteIds && site) ||
        (requestParams.verticalName && requestParams.verticalName !== schema) ||
        (!requestParams.verticalName && schema) ||
        (requestParams.dateRange && requestParams.dateRange !== date) ||
        (!requestParams.dateRange && date) ||
        (requestParams.pagesize && requestParams.pagesize !== pageSize))
    ) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };

  const onUpdateList = (length: number) => {
    if (page === 0 || !(totalRecords - length < page * pageSize - pageSize + 1)) {
      setRequestParams({
        ...requestParams,
      });
    } else {
      const newPage = page > 1 ? page - 1 : PAGE_NUMBER;
      setPage(newPage);
    }
  };

  const [deletedProductList, setDeletedProductList] = useState<any[]>([]);
  useDeleteProductFromShallow(requestParams, deletedProductList, setDeletedProductList, onUpdateList);

  useEffect(() => {
    let newParams: any = { pagesize: pageSize, pagestart: getOffset(page, pageSize) };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field.toLowerCase(),
      };
    }
    if (date) {
      newParams = { ...newParams, dateRange: date };
    }
    if (schema) {
      newParams = { ...newParams, verticalName: schema };
    }
    if (site) {
      newParams = { ...newParams, siteIds: site };
    }
    setRequestParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, site, schema, page, pageSize, sorting]);

  const onSortingChange = (sorting: Sorting<ShallowProductTableInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  const onDisabledCleanUp = () => {
    return !(schema && date);
  };

  const onDeleteList = (list: any) => {
    setDeletedProductList(list);
  };

  const onExport = () => {
    setExport(true);
  };

  return (
    <div className={styles.shallow_cleanup_list_table_wrapper}>
      <ShallowProductListTable
        items={productList}
        sorting={sorting}
        loading={loading || exportLoading}
        pageSize={pageSize}
        page={page}
        totalRecords={totalRecords}
        onDeleteList={onDeleteList}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        onSortingChange={onSortingChange}
        disabledCleanUp={onDisabledCleanUp()}
        onExport={onExport}
        file={file}
      />
    </div>
  );
};

export default ShallowProductList;
