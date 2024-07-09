import React, { useEffect, useState } from 'react';
import styles from './ProductCleanupList.module.less';
import { Sorting } from 'src/types/Sorting';
import ProductCleanupListTable from './ProductCleanupListTable';
import ProductCleanupTableInfo from 'src/types/ProductCleanupTableInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import {
  useGetProductCleanupList,
  useMergeProducts,
  useDifferentiateProducts,
  useMergeAll,
  useDifferentiateAll,
} from 'src/api/productCleanUp';

type ProductCleanupListProps = {
  schema?: string;
  site?: string;
  fingerPrint?: string;
  manufacturer?: string;
};

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_NUMBER = 0;

const ProductCleanupList: React.FC<ProductCleanupListProps> = ({ schema, site, fingerPrint, manufacturer }) => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('productName');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<
    ProductCleanupTableInfo
  >);
  const [requestParams, setRequestParams] = useState<any>(null);
  const [requestLoading, setRequestLoading] = useState<boolean>(false);
  const [loading, totalRecords, productList] = useGetProductCleanupList(requestParams);

  const getOffset = (page: number, size: number): number => {
    if (
      requestParams &&
      ((requestParams.siteId && requestParams.siteId !== site) ||
        (!requestParams.siteId && site) ||
        (requestParams.verticalName && requestParams.verticalName !== schema) ||
        (!requestParams.verticalName && schema) ||
        (requestParams.siteFingerprintId && requestParams.siteFingerprintId !== fingerPrint) ||
        (!requestParams.siteFingerprintId && fingerPrint) ||
        (requestParams.pagesize && requestParams.pagesize !== pageSize) ||
        (requestParams.manufacturersAreEqual && requestParams.manufacturersAreEqual !== manufacturer))
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

  const [mergedProductList, setMergedProductList] = useState<any[]>([]);
  useMergeProducts(requestParams, mergedProductList, setMergedProductList, onUpdateList, setRequestLoading);
  const [differentiatedProductList, setDifferentiatedProductList] = useState<any[]>([]);
  useDifferentiateProducts(
    requestParams,
    differentiatedProductList,
    setDifferentiatedProductList,
    onUpdateList,
    setRequestLoading
  );
  const [isMergeAll, setMergedAll] = useState(false);
  useMergeAll(isMergeAll, setMergedAll, requestParams, setRequestParams, setRequestLoading);
  const [isDifferentiateAll, setDifferentiateAll] = useState(false);
  useDifferentiateAll(isDifferentiateAll, setDifferentiateAll, requestParams, setRequestParams, setRequestLoading);

  useEffect(() => {
    let newParams: any = {
      pagesize: pageSize,
      pagestart: getOffset(page, pageSize),
      manufacturersAreEqual: manufacturer === '1' ? '1' : '0',
    };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: sorting.field,
      };
    }
    if (fingerPrint) {
      newParams = { ...newParams, siteFingerprintId: fingerPrint };
    }
    if (schema) {
      newParams = { ...newParams, verticalName: schema };
    }
    if (site) {
      newParams = { ...newParams, siteId: site };
    }
    setRequestParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerPrint, site, schema, manufacturer, page, pageSize, sorting]);

  const onSortingChange = (sorting: Sorting<ProductCleanupTableInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  const onDisabledCleanUp = () => {
    return !(schema && site && fingerPrint);
  };

  const onDifferentiateList = (list: any) => {
    setDifferentiatedProductList(list);
  };

  const onMergeList = (list: any) => {
    setMergedProductList(list);
  };

  return (
    <div className={styles.product_cleanup_list_table_wrapper}>
      <ProductCleanupListTable
        items={productList}
        sorting={sorting}
        loading={loading || requestLoading}
        pageSize={pageSize}
        page={page}
        totalRecords={totalRecords}
        onMergeList={onMergeList}
        onDifferentiateList={onDifferentiateList}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        onSortingChange={onSortingChange}
        disabledCleanUp={onDisabledCleanUp()}
        setMergedAll={setMergedAll}
        setDifferentiateAll={setDifferentiateAll}
      />
    </div>
  );
};

export default ProductCleanupList;
