import React, { useState, useEffect } from 'react';
import styles from './FilesTableList.module.less';
import FileTableResultType from 'src/types/FileTableResultType';
import { Sorting } from 'src/types/Sorting';
import FilesTableListTable from './FilesTableListTable';
import { useFilesTableFetch } from '../Hooks';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';
import clsx from 'clsx';

export type ResultsTableListProps = {
  sorting: Sorting<FileTableResultType>;
  onSortingChange: (sorting: Sorting<FileTableResultType>) => void;
  runId: string
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 1;

const FilesTableList: React.FC<ResultsTableListProps> = ({
  sorting,
  onSortingChange,
  runId
}: ResultsTableListProps): React.ReactElement => {
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
  } = useFilesTableFetch(sorting, page, pageSize, runId);

  const fetchLoading = productsLoading && rcSearchsListData === null;
  return (
    <div className={clsx("table_list_container")}>
      {productsError && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get Result Files! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {fetchLoading ? (
        <div className={styles.product_list_loader}>
          <Spin spinning={fetchLoading} />
        </div>
      ) : (
          rcSearchsListData !== null && (
            <FilesTableListTable
              items={rcSearchsListData}
              sorting={sorting}
              loading={productsLoading}
              pageSize={pageSize}
              page={page}
              total={totalProducts}
              onPageSizeChange={setPageSize}
              onPageChange={setPage}
              onSortingChange={onSortingChange}
              runId={runId}
            />
          )
        )}
    </div>
  );
};

export default FilesTableList;
