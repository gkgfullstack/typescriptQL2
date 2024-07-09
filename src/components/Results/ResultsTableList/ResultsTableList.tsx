import React from 'react';
import TableResultlistType from 'src/types/TableResultlistType';
import { Sorting } from 'src/types/Sorting';
import ResultsTableListTable from './ResultsTableListTable/ResultsTableListTable';
import clsx from 'clsx';


export type ResultsTableListProps = {
  sorting: Sorting<TableResultlistType>;
  onSortingChange: (sorting: Sorting<TableResultlistType>) => void;
  rcSearchsListData:any;
  productsLoading:any;
  pageSize:any;
  page:any;
  totalProducts:any;
  setPageSize:any;
  setPage:any;
  appId:any;
};



const ResultsTableList1: React.FC<ResultsTableListProps> = ({
  sorting, 
  onSortingChange,
  rcSearchsListData,
  productsLoading,
  pageSize,
  page,
  totalProducts,
  setPageSize,
  setPage,
  appId
}: ResultsTableListProps): React.ReactElement => { 
  return (
    <div className={clsx('table_list_container')}>
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
            isPageType={appId}
           // errorMsg={errorMsg}
          />
    </div>
  );
};

export default ResultsTableList1;
