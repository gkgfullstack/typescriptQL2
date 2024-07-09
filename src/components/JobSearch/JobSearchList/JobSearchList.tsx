import React, { useState, useEffect } from 'react';
//import styles from './JobSearchList.module.less';
import JobSearchInfo from 'src/types/JobSearchInfo';
//import ApplicationFilterType from 'src/types/ApplicationFilterType';
import { Sorting } from 'src/types/Sorting';
import JobSearchListTable from './JobSearchListTable/JobSearchListTable';
import { useJobSearchListFetch } from '../hooks';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';
import clsx from 'clsx';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

export type JobSearchListProps = {
  sorting: Sorting<JobSearchInfo>;
  appId: any;
  onSortingChange: (sorting: Sorting<JobSearchInfo>) => void;
  //values:any;
  createdStart: any;
  createdEnd: any;
  lastrunStart: any;
  lastrunEnd: any;
  finishedStart: any;
  finishedEnd: any;
  updatedStart: any;
  updatedEnd: any;
  ownerName: any;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 1;

const JobSearchList: React.FC<JobSearchListProps> = ({
  sorting,
  appId,
  //values,
  createdStart,
  createdEnd,
  lastrunStart,
  lastrunEnd,
  finishedStart,
  finishedEnd,
  updatedStart,
  updatedEnd,
  onSortingChange,
  ownerName,
}: JobSearchListProps): React.ReactElement => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const isPageType = urlParams.get('isPageType')?.toString();
  const isPageLoad = urlParams.get('isPageLoad')?.toString();
  let bAdminMode = false;
  const input = localStorage.getItem('bAdminMode');
  bAdminMode = input === 'true';

  const { sortingcolumn = 'created', sortingorder = 'ascend', search = '' } = useQueryUrlParams();
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);

  useEffect(() => {
    setPage(PAGE_NUMBER);
  }, [
    search,
    sortingcolumn,
    sortingorder,
    pageSize,
    appId,
    createdStart,
    createdEnd,
    lastrunStart,
    lastrunEnd,
    finishedStart,
    finishedEnd,
    updatedStart,
    updatedEnd,
    ownerName,
    bAdminMode,
  ]);

  const {
    data: searchFilterConditionData,
    loading: productsLoading,
    error: productsError,
    total: totalProducts,
  } = useJobSearchListFetch(
    sorting,
    page,
    pageSize,
    appId,
    search,
    isPageType,
    createdStart,
    createdEnd,
    lastrunStart,
    lastrunEnd,
    finishedStart,
    finishedEnd,
    updatedStart,
    updatedEnd,
    isPageLoad,
    ownerName,
    bAdminMode
  );
  let totalrecords = totalProducts;
  if (page < 1) {
    totalrecords = totalProducts;
  } else {
    totalrecords = Number(localStorage.getItem('totalRecordsJobs'));
  }

  const fetchLoading = productsLoading && searchFilterConditionData === null;
  return (
    <div className={clsx('table_list_container')}>
      {productsError && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get Jobs List! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {fetchLoading ? (
        <div className="product_list_loader">
          <Spin spinning={fetchLoading} />
        </div>
      ) : (
        searchFilterConditionData !== null && (
          <JobSearchListTable
            items={searchFilterConditionData || []}
            sorting={sorting}
            loading={productsLoading}
            pageSize={pageSize}
            page={page}
            total={totalrecords}
            onPageSizeChange={setPageSize}
            onPageChange={setPage}
            onSortingChange={onSortingChange}
            isPageType={isPageType}
            isPageLoad={isPageLoad}
          />
        )
      )}
    </div>
  );
};

export default JobSearchList;
