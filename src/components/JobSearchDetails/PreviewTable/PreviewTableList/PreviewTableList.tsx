import React, { useState, useEffect } from 'react';
import styles from './PreviewTableList.module.less';
import PreviewTypeVIew from 'src/types/PreviewTypeVIew';
import { Sorting } from 'src/types/Sorting';
import PreviewListTable from './PreviewListTable';
import { usePreviewFetch } from '../Hooks';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';
import clsx from 'clsx';

export type PreviewListProps = {
  sorting: Sorting<PreviewTypeVIew>;
  onSortingChange: (sorting: Sorting<PreviewTypeVIew>) => void;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 1;

const PreviewTableList: React.FC<PreviewListProps> = ({
  sorting,
  onSortingChange,
}: PreviewListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);

  useEffect(() => {
    setPage(PAGE_NUMBER);
  }, [pageSize]);

  const {
    data: lineitems,
    loading: productsLoading,
    error: productsError,
    columnsg,
    total: totalProducts,
  } = usePreviewFetch(sorting, page, pageSize);

  const fetchLoading = productsLoading && lineitems === null;
  return (
    <div className={clsx('table_list_container')}>
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
        <div className={styles.product_list_loader}>
          <Spin spinning={fetchLoading} />
        </div>
      ) : (
        lineitems !== null && (
          <PreviewListTable
            items={lineitems}
            columns={columnsg}
            columnsg={columnsg}
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

export default PreviewTableList;
