import React, { useEffect, useState } from 'react';
import styles from './SKUList.module.less';
import { Sorting } from 'src/types/Sorting';
import SKUTable from './SKUTable';
import SORT_ORDER from 'src/enums/sortOrder';
import SKUInfo from 'src/types/SKU_Info';
import { useGetSKUList } from 'src/api/SKU';
import { useExportSKU } from 'src/api/SKU';

export type SKUTableProps = {
  search?: string;
  sku?: string;
  status?: string;
  requestParams: any;
  setRequestParams: any;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const SKUList: React.FC<SKUTableProps> = ({
  search,
  sku,
  status,
  requestParams,
  setRequestParams,
}: SKUTableProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('productName');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<SKUInfo>);
  const [loading, totalRecords, skuList] = useGetSKUList(requestParams);
  const [isExport, setExport] = useState(false);
  const [exportLoading] = useExportSKU(requestParams, isExport, setExport);

  const getOffset = (page: number, size: number): number => {
    if (
      requestParams &&
      ((requestParams.name && requestParams.name !== search) ||
        (!requestParams.name && search) ||
        (requestParams.status && requestParams.status !== status) ||
        (!requestParams.status && status) ||
        (requestParams.sku && requestParams.sku !== sku) ||
        (!requestParams.sku && sku) ||
        (requestParams.pagesize && requestParams.pagesize !== pageSize))
    ) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };

  useEffect(() => {
    let newParams: any = { pagesize: pageSize, pagestart: getOffset(page, pageSize) };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingOrder: SORT_ORDER[sorting.order],
        sortingColumn: sorting.field,
      };
    }
    if (search) {
      newParams = { ...newParams, name: search };
    }
    if (sku) {
      newParams = { ...newParams, sku: sku };
    }
    if (status) {
      newParams = { ...newParams, status: status };
    }
    setRequestParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sku, status, page, pageSize, sorting]);

  const onSortingChange = (sorting: Sorting<SKUInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  const onExport = () => {
    setExport(true);
  };

  return (
    <div className={styles.sku_list_table_wrapper}>
      <SKUTable
        items={skuList}
        sorting={sorting}
        loading={loading || exportLoading}
        pageSize={pageSize}
        page={page}
        total={totalRecords || 0}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        onSortingChange={onSortingChange}
        onExport={onExport}
      />
    </div>
  );
};

export default SKUList;
