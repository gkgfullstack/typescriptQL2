import React, { useEffect, useState } from 'react';
import styles from './UsageProgress.module.less';
import { Progress } from 'antd';
import { useGetUsageStatistics } from 'src/api/usageFunction';
import Spin from 'src/components/common/Spin';

type UsageProgressProps = {
  usageType?: any;
};

const UsageProgress: React.FC<UsageProgressProps> = ({ usageType }) => {
  const [params, setParams] = useState<any>(null);
  const [loading, usageStatistics] = useGetUsageStatistics(params, setParams);

  useEffect(() => {
    setParams({
      usageType: usageType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPercent = (percent: string) => {
    if (percent) {
      return Number(percent.replace('%', ''));
    }
    return undefined;
  };

  const getNumber = (value: string) => {
    if (value) {
      return Number(value)
        .toLocaleString('en');
    }
    return undefined;
  };

  return (
    <div className={styles.usage_progress_wrapper}>
      <Spin spinning={loading}>
        {usageStatistics &&
          usageStatistics.map(
            (application: any): React.ReactNode => {
              return (
                <div key={application.appName}>
                  <p className={styles.usage_progress_label}>{application.appName}</p>
                  <Progress
                    percent={getPercent(application.remUsagePercent)}
                    format={(percent: number | undefined) => (
                      <>
                        <b>{percent ? percent : '0'}%</b> Remaining
                      </>
                    )}
                    strokeColor={'#002D74'}
                    strokeWidth={4}
                    width={200}
                  />
                  <p className={styles.usage_progress_text}>
                    {getNumber(application.leftDay)} Days Remaining in cycle
                    <br />
                    {getNumber(application.remInputs)} inputs remaining
                  </p>
                </div>
              );
            }
          )}
      </Spin>
    </div>
  );
};

export default UsageProgress;
