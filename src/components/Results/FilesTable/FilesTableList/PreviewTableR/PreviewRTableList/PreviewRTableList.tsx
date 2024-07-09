import React, { useState, useEffect } from 'react';
import styles from './PreviewRTableList.module.less';
import RTLPreviewType from 'src/types/RTLPreviewType';
import { Sorting } from 'src/types/Sorting';
import PreviewRListTable from './PreviewRListTable';
import { usePreviewrFetch } from '../Hooks';
import Spin from 'src/components/common/Spin';
import clsx from 'clsx';

export type PreviewListProps = {
  sorting: Sorting<RTLPreviewType>;
  onSortingChange: (sorting: Sorting<RTLPreviewType>) => void;
  resultid:any;
  };

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 1;

const PreviewRTableList: React.FC<PreviewListProps> = ({
  sorting,
  onSortingChange,
  resultid,
}: PreviewListProps): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);

  useEffect(() => {
    setPage(PAGE_NUMBER);
  }, [pageSize]);

  const {
    data: lineItems,
    loading: productsLoading,
    message,
   columnsg,
   total: totalProducts,
   listdata
  } = usePreviewrFetch(sorting, page, pageSize, resultid);
  const fetchLoading = productsLoading && lineItems === null;
  return (
    <div className={clsx("table_list_container")}>
      {fetchLoading ? (
        <div className={styles.product_list_loader}>
          <Spin spinning={fetchLoading} />
        </div>
      ) : (listdata === "Failed" ? (<span className={styles.priviewTable}>{message}</span>) : lineItems !== null && (
            <PreviewRListTable
              items={lineItems}
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

export default PreviewRTableList;
