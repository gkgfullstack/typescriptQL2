import React, { useEffect, useState } from 'react';
import styles from './RunHistoryList.module.less';
import { Sorting } from 'src/types/Sorting';
import RunHistoryTable from './RunHistoryTable';
import { SearchSummary } from 'src/types/SearchSummary';
import SORT_ORDER from 'src/enums/sortOrder';
import UsageListParams from 'src/types/UsageListParams';
import { useGetRunHistoryList } from 'src/api/usageFunction';

export type RunHistoryListProps = {
  application: string;
  user: string;
  site: string;
  job: string;
  date: {
    startDate: string;
    endDate: string;
  };
  period: string;
  usageType: string;
  timeZone: string;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const RunHistoryList: React.FC<RunHistoryListProps> = ({
  application,
  user,
  site,
  job,
  date,
  period,
  usageType,
  timeZone,
}): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('timePeriod');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<SearchSummary>);
  const [requestParams, setRequestParams] = useState<UsageListParams | null>(null);
  const [loading, totalRecords, runHistoryList] = useGetRunHistoryList(period, requestParams);
  const getOffset = (page: number, size: number): number => {
    if (
      requestParams &&
      ((requestParams.size && requestParams.size !== pageSize) ||
        requestParams.sortingorder !== SORT_ORDER[sorting.order] ||
        requestParams.sortingcolumn !== sorting.field)
    ) {
      setPage(PAGE_NUMBER);
      return PAGE_NUMBER;
    }

    return page > 1 ? (page - 1) * size : PAGE_NUMBER;
  };

  const onDisable = () => {
    return !!(application && user && site && job && date && timeZone);
  };

  useEffect(() => {
    if (onDisable()) {
      let newParams: UsageListParams = {
        size: pageSize,
        offset: getOffset(page, pageSize),
        usageType: usageType,
        appId: application,
        startDate: date ? date.startDate : '',
        endDate: date ? date.endDate : '',
        accountId: user,
        siteCode: site,
        jobId: job,
        timeZone,
      };
      if (sorting) {
        newParams = {
          ...newParams,
          sortingorder: SORT_ORDER[sorting.order],
          sortingcolumn: sorting.field,
        };
      }
      setRequestParams(newParams);
    } else {
      setRequestParams(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, sorting, application, user, site, job, date, usageType, period, timeZone]);

  const onSortingChange = (sorting: Sorting<SearchSummary>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  return (
    <div className={styles.run_history_list_table_wrapper}>
      <RunHistoryTable
        items={runHistoryList}
        sorting={sorting}
        loading={loading}
        pageSize={pageSize}
        page={page}
        total={totalRecords || 0}
        onDisable={onDisable}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        onSortingChange={onSortingChange}
        period={period}
        isInputVisible={usageType === 'input'}
      />
    </div>
  );
};

export default RunHistoryList;
