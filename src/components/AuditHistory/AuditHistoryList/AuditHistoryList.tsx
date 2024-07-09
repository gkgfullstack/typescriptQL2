import React, { useState, useEffect } from 'react';
import styles from './AuditHistoryList.module.less';
import AuditHistoryInfo from 'src/types/AuditHistoryInfo';
import { Sorting } from 'src/types/Sorting';
import AuditHistoryListTable from './AuditHistoryListTable/AuditHistoryListTable';
import { useAuditHistoryListFetch } from '../hooks';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';
import clsx from 'clsx';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

export type AuditHistoryListProps = {
  sorting: Sorting<AuditHistoryInfo>;
  onSortingChange: (sorting: Sorting<AuditHistoryInfo>) => void;
  filters: any;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 1;

const AuditHistoryList: React.FC<AuditHistoryListProps> = ({
  sorting,
  onSortingChange,
  filters,
}: AuditHistoryListProps): React.ReactElement => {
  const { sortingcolumn = 'RequestType', sortingorder = 'ascend' } = useQueryUrlParams();
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);

  useEffect(() => {
    setPage(PAGE_NUMBER);
  }, [sortingcolumn, sortingorder, pageSize]);

  const {
    data: auditHistoryListData,
    loading: productsLoading,
    error: productsError,
    total: totalProducts,
  } = useAuditHistoryListFetch(sorting, page, pageSize, filters);

  const fetchLoading = productsLoading && auditHistoryListData === null;
  const isAuditTableDisabled = () => {
    const disabledText = [];
    if (filters) {
      if (!filters.requestType) {
        disabledText.push('Request Type');
      }
      if (!filters.status) {
        disabledText.push('Status');
      }
      if (!filters.reporter) {
        disabledText.push(' Reporter');
      }
      if (!filters.competitorSite) {
        disabledText.push('Competitor Site');
      }
    }

    return disabledText.reduce((str: string, text: string, i: number) => {
      if (i > 0 && i === disabledText.length - 1) {
        return `${str} and ${text}`;
      }
      return str ? `${str}, ${text}` : text;
    }, '');
  };

  return (
    <div className={clsx('table_list_container')}>
      {productsError && (
        <Alert
          message="Error"
          description="An error has occurred when trying to get Audit History! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {fetchLoading ? (
        <div className={styles.product_list_loader}>
          <Spin spinning={fetchLoading} />
        </div>
      ) : (
        <AuditHistoryListTable
          items={auditHistoryListData || []}
          sorting={sorting}
          loading={productsLoading}
          pageSize={pageSize}
          page={page}
          total={totalProducts}
          onPageSizeChange={setPageSize}
          onPageChange={setPage}
          isAuditTableDisabled={isAuditTableDisabled()}
          onSortingChange={onSortingChange}
        />
      )}
    </div>
  );
};

export default AuditHistoryList;
