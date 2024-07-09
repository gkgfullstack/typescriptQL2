import React, { useState, useEffect } from 'react';
import styles from './FilesListTableList.module.less';
import RCSearchsType from 'src/types/RCSearchsType';
import { Sorting } from 'src/types/Sorting';
import FilesListTableListTable from './FilesListTableListTable';
import { useUploadColumnsFetch } from '../Hooks';
import Spin from 'src/components/common/Spin';
import clsx from 'clsx';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';


export type RCSearchsListProps = {
  sorting: Sorting<RCSearchsType>;
  onSortingChange: (sorting: Sorting<RCSearchsType>) => void;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 1;

const FilesListTableList: React.FC<RCSearchsListProps> = ({
  sorting,
  onSortingChange,
}: RCSearchsListProps): React.ReactElement => {
  const setQuery = useQueryUrlParamsDispatch<any>();
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);



  const {
    data: rcSearchsListData,
    loading: productsLoading,
    error: productsError,
    delimeter:delimeter,
  } = useUploadColumnsFetch(sorting, page);

  useEffect(() => {
    setPage(PAGE_NUMBER);
    setQuery({
      delimeter: delimeter,
    });
  }, [pageSize, delimeter]);
  const fetchLoading = productsLoading && rcSearchsListData === null;
  return (
    <div className={clsx("table_list_container")}>
    
      {productsError && (<><><>
        <span>You must upload line items in XSV format. The first column must specify a valid script identifier.<br /></span></>
        <span>  The rest of the columns are script-dependent and will not be checked for validity until the script executes.
        </span></><hr /></>
       
      )}
      
      {fetchLoading ? (
        <div className={styles.product_list_loader}>
          <Spin spinning={fetchLoading} />
        </div>
      ) : (
        rcSearchsListData !== null && rcSearchsListData.length>0 && (
          <><span>You must upload data in XSV format, with columns as follows:</span>
          <FilesListTableListTable
              items={rcSearchsListData}
              sorting={sorting}
              loading={productsLoading}
              pageSize={pageSize}
              page={page}

              onPageSizeChange={setPageSize}
              onPageChange={setPage}
              onSortingChange={onSortingChange} /></>
        )
      )}
    </div>
  );
};

export default FilesListTableList;
