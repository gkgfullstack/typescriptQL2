import React, { useState, useEffect } from 'react';
//import styles from './RCSearchsList.module.less';
//import RCSearchsType from 'src/types/RCSearchsType';
import RCSearchsType from 'src/types/RCSearchsType';
import { Sorting } from 'src/types/Sorting';
import RCSearchsListTable from './RCSearchsListTable/RCSearchsListTable';
import { useRCSearchsFetch } from '../Hooks';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';
import clsx from 'clsx';
//import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

export type RCSearchsListProps = {
  sorting: Sorting<RCSearchsType>;
  onSortingChange: (sorting: Sorting<RCSearchsType>) => void;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 1;

const RCSearchsList: React.FC<RCSearchsListProps> = ({
  sorting,
  onSortingChange,
}: RCSearchsListProps): React.ReactElement => {
  //const { sortingcolumn = 'Finished', sortingorder = 'desc' } = useQueryUrlParams();
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);

  useEffect(() => {
    setPage(PAGE_NUMBER);
  }, [pageSize]);

  const {
    data: rcSearchsListData,
    loading: productsLoading,
    error: productsError,
    total: totalProducts,
  } = useRCSearchsFetch(sorting, page, pageSize);

  const fetchLoading = productsLoading && rcSearchsListData === null;
  return (
    <div className={clsx("table_list_container")}>
       <h2>Recent Completed Searches</h2>
      {productsError && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get line Items! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {fetchLoading ? (
        <div className="table_list_loader">
          <Spin spinning={fetchLoading} />
        </div>
      ) : (
        rcSearchsListData !== null && (
          <RCSearchsListTable
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

export default RCSearchsList;
