import React, { useEffect, useState } from 'react';
import styles from './SpiderCategoryList.module.less';
import { Sorting } from 'src/types/Sorting';
import SpiderCategoryListTable from './SpiderCategoryListTable';
import SpiderCategoryInfo from './SpiderCategoryInfo';
import SpiderCategoryTableInfo from 'src/types/SpiderCategoryTableInfo';
import SORT_ORDER from 'src/enums/sortOrder';
import {
  useDeleteCategoryFromSpider,
  useGetSpiderCleanupList,
  useExportSpiderCleanup,
} from 'src/api/spiderCleanupList';

export type SpiderCategoryListProps = {
  category?: string;
  site?: string;
  schema?: string;
};

export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_NUMBER = 0;

const SpiderCategoryList: React.FC<SpiderCategoryListProps> = ({
  schema,
  site,
  category,
}: SpiderCategoryListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('full_Path');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<
    SpiderCategoryTableInfo
  >);
  const [requestParams, setRequestParams] = useState<any>(null);
  const [isCleanUp, setCleanUp] = useState(false);
  const [isExport, setExport] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [exportLoading] = useExportSpiderCleanup(requestParams, isExport, setExport, setFile);
  const onUpdateList = () => {
    setRequestParams({
      ...requestParams,
    });
  };
  useDeleteCategoryFromSpider(schema, site, isCleanUp, setCleanUp, onUpdateList);

  const [
    loading,
    totalRecords,
    categoryList,
    totalCategoriesCount,
    newCategoriesCount,
    deletedCategoriesCount,
  ] = useGetSpiderCleanupList(requestParams);

  const getOffset = (page: number, size: number): number => {
    if (
      requestParams &&
      ((requestParams.ownerId && requestParams.ownerId !== site) ||
        (!requestParams.ownerId && site) ||
        (requestParams.verticalName && requestParams.verticalName !== schema) ||
        (!requestParams.verticalName && schema) ||
        (requestParams.status && requestParams.status !== category) ||
        (!requestParams.status && category) ||
        (requestParams.pagesize && requestParams.pagesize !== pageSize))
    ) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };

  const getSorting = (field: string) => {
    if (field === 'name') {
      return 'categoryname';
    }
    if (field === 'ID') {
      return 'categoryid';
    }
    if (field === 'full_Path') {
      return 'fullpath';
    }
    return field;
  };

  useEffect(() => {
    let newParams: any = { pagesize: pageSize, pagestart: getOffset(page, pageSize) };
    if (sorting) {
      newParams = {
        ...newParams,
        sortingorder: SORT_ORDER[sorting.order],
        sortingcolumn: getSorting(sorting.field),
      };
    }
    if (category) {
      newParams = { ...newParams, status: category };
    }
    if (schema) {
      newParams = { ...newParams, verticalName: schema };
    }
    if (site) {
      newParams = { ...newParams, ownerId: site };
    }
    setFile({});
    setRequestParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, site, schema, page, pageSize, sorting]);

  const onSortingChange = (sorting: Sorting<SpiderCategoryTableInfo>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  const onDisabledCleanUp = () => {
    return isCleanUp || loading || !(schema && site);
  };

  const onCleanUpList = () => {
    setCleanUp(true);
  };

  const onExport = () => {
    setExport(true);
  };

  return (
    <>
      <SpiderCategoryInfo
        totalCategoriesCount={totalCategoriesCount}
        deletedCategoriesCount={deletedCategoriesCount}
        newCategoriesCount={newCategoriesCount}
      />
      <div className={styles.spider_cleanup_list_table_wrapper}>
        <SpiderCategoryListTable
          items={categoryList}
          sorting={sorting}
          loading={loading || isCleanUp || exportLoading}
          pageSize={pageSize}
          page={page}
          totalRecords={totalRecords}
          onCleanUpList={onCleanUpList}
          onPageSizeChange={onPageSizeChange}
          onPageChange={onPageChange}
          onSortingChange={onSortingChange}
          disabledCleanUp={onDisabledCleanUp()}
          onExport={onExport}
          file={file}
        />
      </div>
    </>
  );
};

export default SpiderCategoryList;
