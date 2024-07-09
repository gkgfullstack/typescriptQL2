import axios from './axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';
import UsageListParams from 'src/types/UsageListParams';

const API_URL_TIMEZONE = '/qs/usage/gettimezone';

export const useGetUsageStatistics = (params: any, setParams: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [usageStatistics, setUsageStatistics] = useState<any>([]);

  useEffect(() => {
    if (params && params.usageType) {
      setLoading(true);
      axios &&
        axios
          .get(`/qs/usage/getusage`, {
            params: {
              ...params,
            },
          })
          .then((response: any) => {
            if (response) {
              setUsageStatistics(response.usage);
            }
            setLoading(false);
            setParams(null);
          })
          .catch(() => {
            setLoading(false);
            setParams(null);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [loading, usageStatistics];
};

const toCapitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const transformUsageChartData = (data: any, usageType: string) => {
  const transformedData: any = [];

  data.forEach((item: any, i: number) => {
    transformedData.push({
      day: toCapitalize(item.timePeriod),
      type: `Executed ${usageType}s`,
      key: `executed-${i}`,
      value: Number(item.exceuted),
    });
    transformedData.push({
      day: toCapitalize(item.timePeriod),
      type: `Total ${usageType}s`,
      key: `total-${i}`,
      value: Number(item.total),
    });
  });

  return transformedData;
};

export const useGetUsageChart = (period: string, params: any, setParams: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [usageChartData, setUsageChartData] = useState<any>(null);

  useEffect(() => {
    if (
      period &&
      params &&
      params.appId &&
      params.startDate &&
      params.siteCode &&
      params.accountId &&
      params.jobId &&
      params.timeZone
    ) {
      setLoading(true);
      axios &&
        axios
          .post(`/qs/usage/usagesummaryreport?reportType=${period}`, {
            usageFilterInput: {
              ...params,
            },
          })
          .then((response: any) => {
            if (response) {
              setUsageChartData(transformUsageChartData(response.usageSummaryReport.data, params.usageType));
            }
            setLoading(false);
            setParams({});
          })
          .catch(() => {
            setLoading(false);
            setParams(null);
          });
    } else if (params && Object.keys(params).length > 0) {
      setUsageChartData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, params]);

  return [loading, usageChartData];
};

export const useGetUsageApplication = (dateParam: any) => {
  const [usageApplication, setUsageApplication] = useState<any>([]);

  useEffect(() => {
    if (dateParam && dateParam.startDate) {
      setUsageApplication([]);
      axios &&
        axios
          .post(`/qs/usage/application`, {
            usageFilterInput: {
              startDate: dateParam.startDate,
              endDate: dateParam.endDate,
            },
          })
          .then((response: any) => {
            if (response && response.application) {
              setUsageApplication(
                response.application.map((item: any) => {
                  return {
                    id: item.appId,
                    name: item.appName,
                  };
                })
              );
            }
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateParam]);

  return [usageApplication];
};

export const useGetUsageUsers = (application: string, dateParam: any) => {
  const [usageUsers, setUsageUsers] = useState<any>([]);

  useEffect(() => {
    if (application && dateParam && dateParam.startDate) {
      setUsageUsers([]);
      axios &&
        axios
          .post(`/qs/usage/useraccount`, {
            usageFilterInput: {
              appId: application,
              startDate: dateParam.startDate,
              endDate: dateParam.endDate,
            },
          })
          .then((response: any) => {
            if (response && response.userAccount) {
              setUsageUsers(
                response.userAccount.map((item: any) => {
                  return {
                    id: item.accountId,
                    name: item.accountName,
                  };
                })
              );
            }
          });
    } else {
      setUsageUsers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application]);

  return [usageUsers];
};

export const useGetUsageSites = (applicationParam: string, userParam: string, dateParam: any) => {
  const [usageSites, setUsageSites] = useState<any>([]);

  useEffect(() => {
    if (applicationParam !== '' && userParam !== '' && dateParam && dateParam.startDate) {
      setUsageSites([]);
      axios &&
        axios
          .post(`/qs/usage/sites`, {
            usageFilterInput: {
              appId: applicationParam,
              accountId: userParam,
              startDate: dateParam.startDate,
              endDate: dateParam.endDate,
            },
          })
          .then((response: any) => {
            if (response) {
              setUsageSites(
                response.sites.map((item: any) => {
                  return {
                    id: item.siteCode,
                    name: item.siteName,
                  };
                })
              );
            }
          });
    } else {
      setUsageSites([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationParam, userParam]);

  return [usageSites];
};

export const useGetUsageJobs = (application: string, user: string, site: string, dateParam: any) => {
  const [usageJobs, setUsageJobs] = useState<any>([]);

  useEffect(() => {
    if (!!(application !== '' && user !== '' && site !== '' && dateParam && dateParam.startDate)) {
      setUsageJobs([]);
      axios &&
        axios
          .post(`/qs/usage/searches`, {
            usageFilterInput: {
              appId: application,
              accountId: user,
              siteCode: site,
              startDate: dateParam.startDate,
              endDate: dateParam.endDate,
            },
          })
          .then((response: any) => {
            if (response) {
              setUsageJobs(
                response.searches.map((item: any) => {
                  return {
                    id: item.jobId,
                    name: item.jobName,
                  };
                })
              );
            }
          });
    } else {
      setUsageJobs([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [application, user, site]);

  return [usageJobs];
};

export const useGetSiteSummaryList = (params: UsageListParams | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [siteSummaryList, setSiteSummaryList] = useState<any>([]);

  useEffect(() => {
    if (
      params &&
      params.appId &&
      params.siteCode &&
      params.startDate &&
      params.accountId &&
      params.jobId &&
      params.timeZone
    ) {
      setLoading(true);
      axios &&
        axios
          .post(
            `/qs/usage/sitesummary`,
            {
              usageFilterInput: {
                appId: params.appId,
                endDate: params.endDate,
                siteCode: params.siteCode,
                accountId: params.accountId,
                jobId: params.jobId,
                startDate: params.startDate,
                usageType: params.usageType,
                timeZone: params.timeZone,
              },
            },
            {
              params: {
                offset: params.offset,
                size: params.size,
                sortingcolumn: params.sortingcolumn,
                sortingorder: params.sortingorder,
              },
            }
          )
          .then((response: any) => {
            if (response) {
              setSiteSummaryList(response.siteSummary);
              setTotalRecords(Number(response.totalRecords));
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setSiteSummaryList([]);
      setTotalRecords(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [loading, totalRecords, siteSummaryList];
};

export const useGetSearchSummaryList = (params: UsageListParams | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [searchSummaryList, setSearchSummaryList] = useState<any>([]);

  useEffect(() => {
    if (
      params &&
      params.appId &&
      params.siteCode &&
      params.startDate &&
      params.accountId &&
      params.jobId &&
      params.timeZone
    ) {
      setLoading(true);
      axios &&
        axios
          .post(
            `/qs/usage/searchsummary`,
            {
              usageFilterInput: {
                appId: params.appId,
                endDate: params.endDate,
                siteCode: params.siteCode,
                accountId: params.accountId,
                jobId: params.jobId,
                startDate: params.startDate,
                usageType: params.usageType,
                timeZone: params.timeZone,
              },
            },
            {
              params: {
                offset: params.offset,
                size: params.size,
                sortingcolumn: params.sortingcolumn,
                sortingorder: params.sortingorder,
              },
            }
          )
          .then((response: any) => {
            if (response) {
              setSearchSummaryList(response.searchSummary);
              setTotalRecords(Number(response.totalRecords));
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setSearchSummaryList([]);
      setTotalRecords(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [loading, totalRecords, searchSummaryList];
};

export const useGetRunHistoryList = (period: string, params: UsageListParams | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [runHistoryList, setRunHistoryList] = useState<any>([]);

  useEffect(() => {
    if (
      period &&
      params &&
      params.usageType &&
      params.appId &&
      params.startDate &&
      params.siteCode &&
      params.accountId &&
      params.jobId &&
      params.timeZone
    ) {
      setLoading(true);
      axios &&
        axios
          .post(
            `/qs/usage/usagesummaryreport`,
            {
              usageFilterInput: {
                appId: params.appId,
                endDate: params.endDate,
                siteCode: params.siteCode,
                accountId: params.accountId,
                jobId: params.jobId,
                startDate: params.startDate,
                usageType: params.usageType,
                timeZone: params.timeZone,
              },
            },
            {
              params: {
                reportType: period,
                size: params.size,
                offset: params.offset,
                sortingorder: params.sortingorder,
                sortingcolumn: params.sortingcolumn,
              },
            }
          )
          .then((response: any) => {
            if (response && response.usageSummaryReport) {
              setRunHistoryList(response.usageSummaryReport.data);
              setTotalRecords(Number(response.usageSummaryReport.totalRecords));
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    } else {
      setRunHistoryList([]);
      setTotalRecords(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return [loading, totalRecords, runHistoryList];
};

export const useGetTimeZonesSettings = () => {
  const [userTimeZone, setUserTimeZone] = useState<string | undefined>(undefined);
  const [availableTimeZones, setAvailableTimeZones] = useState<string[]>([]);

  useEffect(() => {
    axios &&
      axios
        .get(API_URL_TIMEZONE)
        .then((response: any) => {
          if (response) {
            setUserTimeZone(response.userTimeZone);
            setAvailableTimeZones(response.TimeZoneList);
          }
        })
        .catch(error => {
          console.log(error);
        });
  }, []);

  return {
    userTimeZone,
    availableTimeZones,
  };
};
