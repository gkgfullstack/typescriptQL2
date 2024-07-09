import React, { useState, useEffect } from 'react';
import styles from './ResultsTableList.module.less';
import TableResultlistType from 'src/types/TableResultlistType';
import { Sorting } from 'src/types/Sorting';
import ResultsTableListTable from './ResultsTableListTable/ResultsTableListTable';
import { useResultsTableFetch } from '../../Hooks';
import Spin from 'src/components/common/Spin';
import clsx from 'clsx';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';


export type ResultsTableListProps = {
  sorting: Sorting<TableResultlistType>;
  appId: any;
  jobId: any;
  onSortingChange: (sorting: Sorting<TableResultlistType>) => void;
  createdStart:any,
    createdEnd:any;
    lastrunStart:any;
    lastrunEnd:any;
    finishedStart:any;
    finishedEnd:any;
    updatedStart:any;
    updatedEnd:any;
};

export const DEFAULT_PAGE_SIZE = 30;
export const PAGE_NUMBER = 1;

const ResultsTableList1: React.FC<ResultsTableListProps> = ({
  sorting,
  appId,
  jobId,
  createdStart,
  createdEnd,
  lastrunStart,
  lastrunEnd,
  finishedStart,
  finishedEnd,
  updatedStart,
  updatedEnd,
  
 
  onSortingChange,
}: ResultsTableListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const { sortingcolumn = 'null', sortingorder = 'descend', search = '' } = useQueryUrlParams();
  const { searchId } = useSearchDetailsStateContext();
  jobId=searchId;
  let errorMsg="";
  useEffect(() => {
    setPage(PAGE_NUMBER);
  }, [
        sortingcolumn,
    sortingorder,
    pageSize,
    appId,
    jobId,
    search,
    createdStart,
    createdEnd,
    lastrunStart,
    lastrunEnd,
    finishedStart,
    finishedEnd,
    updatedStart,
    updatedEnd
  ]);

  const {
    data: rcSearchsListData,
    loading: productsLoading,
    total: totalProducts,
  } = useResultsTableFetch(
    sorting, 
    page,
    pageSize,
    appId,
    jobId,
    search,
    createdStart,
    createdEnd,
    lastrunStart,
    lastrunEnd,
    finishedStart,
    finishedEnd,
    updatedStart,
    updatedEnd,
    errorMsg
    );

  const fetchLoading = productsLoading && rcSearchsListData === null;

  return (
    <div className={clsx("table_list_container")}>      
   {fetchLoading ? (
        <div className={styles.product_list_loader}>
          <Spin spinning={fetchLoading} />
        </div>
      ) : (
        rcSearchsListData !== null && (
          <ResultsTableListTable
            items={rcSearchsListData}
            sorting={sorting}
            loading={productsLoading}
            pageSize={pageSize}
            page={page}
            total={totalProducts}
            onPageSizeChange={setPageSize}
            onPageChange={setPage}
            onSortingChange={onSortingChange}
          />
        )
      )}
    </div>
  );
};

export default ResultsTableList1;
