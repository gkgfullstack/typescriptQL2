import React, { useEffect, useState } from 'react';
import styles from './UsageSummary.module.less';
import UsageSummaryFilter from './UsageSummaryFilter';
import UsageSummaryChart from './UsageSummaryChart';
import { useGetUsageChart } from 'src/api/usageFunction';
import Spin from 'src/components/common/Spin';

type UsageSummaryProps = {
  onUpdate: (value: string) => void;
  application: string;
  date?: {
    startDate: string;
    endDate: string;
  };
  usageType: string;
  site: string;
  user: string;
  job: string;
  timeZone: string;
};

const UsageSummary: React.FC<UsageSummaryProps> = ({
  onUpdate,
  application,
  site,
  user,
  job,
  date,
  usageType,
  timeZone,
}) => {
  const [period, setPeriod] = useState<any>('daily');
  const [requestParams, setRequestParams] = useState<any>(null);
  const [loading, usageChartData] = useGetUsageChart(period, requestParams, setRequestParams);

  const onDisable = () => {
    return application && date;
  };

  useEffect(() => {
    if (onDisable()) {
      setRequestParams({
        appId: application,
        usageType: usageType,
        startDate: date ? date.startDate : '',
        endDate: date ? date.endDate : '',
        siteCode: site,
        accountId: user,
        jobId: job,
        timeZone,
      });
    } else {
      setRequestParams(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, application, site, user, job, date, usageType, timeZone]);

  const onFilterUpdate = (value: string) => {
    setPeriod(value);
    onUpdate(value);
  };

  return (
    <div className={styles.usage_summary_wrapper}>
      <div className={styles.usage_summary_header}>
        <h2>Summary</h2>
        <UsageSummaryFilter onUpdate={onFilterUpdate} />
      </div>
      <Spin spinning={loading} className={styles.usage_loading_wrapper} size="large">
        {usageChartData !== null && !loading && <UsageSummaryChart data={usageChartData} id={'usage_summary_chart'} />}
        {usageChartData === null && (
          <p className={styles.no_results}>Select Application, User, Site, Job, Date Range and Timezone to refine your results</p>
        )}
        {usageChartData !== null && usageChartData.length === 0 && !loading && (
          <p className={styles.no_results}>No results</p>
        )}
      </Spin>
    </div>
  );
};

export default UsageSummary;
