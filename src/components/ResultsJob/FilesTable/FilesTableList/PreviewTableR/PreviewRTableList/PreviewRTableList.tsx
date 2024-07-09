import React, { useState, useEffect } from 'react';
import styles from './PreviewRTableList.module.less';
import RTLPreviewType from 'src/types/RTLPreviewType';
import { Sorting } from 'src/types/Sorting';
import PreviewRListTable from './PreviewRListTable';
import { usePreviewrFetch } from '../Hooks';
import Spin from 'src/components/common/Spin';
//import { Alert } from 'antd';
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
  //const { sortingcolumn = 'Finished', sortingorder = 'desc' } = useQueryUrlParams();
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
   listdata,
  } = usePreviewrFetch(sorting, page, pageSize, resultid);
  console.log('message========= PreviewRTableList', message)

  const fetchLoading = productsLoading && lineItems === null;
  return (
    <div className={clsx("table_list_container")}>
      {listdata === "Failed" && (<span style={{
        fontSize:'18px',
        width: '100%', 
        textAlign:'center',
        display: 'block',
        marginBottom: '40px',
        }}>{message}</span>)}
      {fetchLoading ? (
        <div className={styles.product_list_loader}>
          <Spin spinning={fetchLoading} />
        </div>
      ) : (lineItems !== null && (
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
