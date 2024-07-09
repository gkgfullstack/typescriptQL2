type UsageListParams = {
  size?: number;
  offset?: number;
  sortingcolumn?: string;
  sortingorder?: string;
  job?: string;
  accountId?: string;
  usageType?: string;
  appId?: string;
  startDate?: string;
  endDate?: string;
  siteCode?: string;
  jobId?: string;
  timeZone?: string;
};

export default UsageListParams;
