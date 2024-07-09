import React, { useEffect, useState } from 'react';
import styles from './SiteSummaryList.module.less';
import { Sorting } from 'src/types/Sorting';
import SiteSummaryTable from './SiteSummaryTable';
import { SiteUsageSummary } from 'src/types/SiteUsageSummary';
import SORT_ORDER from 'src/enums/sortOrder';
import UsageListParams from 'src/types/UsageListParams';
import { useGetSiteSummaryList } from 'src/api/usageFunction';

export type SiteSummaryListProps = {
  application: string;
  user: string;
  site: string;
  job: string;
  date?: {
    startDate: string;
    endDate: string;
  };
  usageType: string;
  timeZone: string;
};

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 0;

const SiteSummaryList: React.FC<SiteSummaryListProps> = ({
  application,
  user,
  site,
  job,
  date,
  usageType,
  timeZone,
}): React.ReactElement => {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [currentColumn] = useState('siteName');
  const [currentOrder] = useState('ascend');
  const [sorting, setSorting] = useState({ field: currentColumn, order: currentOrder } as Sorting<SiteUsageSummary>);
  const [requestParams, setRequestParams] = useState<UsageListParams | null>(null);
  const [loading, totalRecords, siteSummaryList] = useGetSiteSummaryList(requestParams);
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
        siteCode: site,
        accountId: user,
        appId: application,
        jobId: job,
        startDate: date ? date.startDate : '',
        endDate: date ? date.endDate : '',
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
  }, [page, pageSize, sorting, application, user, site, job, date, usageType, timeZone]);

  const onSortingChange = (sorting: Sorting<SiteUsageSummary>): void => {
    setSorting(sorting);
  };

  const onPageSizeChange = (pageSize: number): void => {
    setPageSize(pageSize);
  };

  const onPageChange = (page: number): void => {
    setPage(page);
  };

  return (
    <div className={styles.site_list_table_wrapper}>
      <SiteSummaryTable
        items={siteSummaryList}
        sorting={sorting}
        loading={loading}
        pageSize={pageSize}
        page={page}
        total={totalRecords || 0}
        onDisable={onDisable}
        onPageSizeChange={onPageSizeChange}
        onPageChange={onPageChange}
        onSortingChange={onSortingChange}
        isInputVisible={usageType === 'input'}
      />
    </div>
  );
};

export default SiteSummaryList;
