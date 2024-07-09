import React from 'react';
import { Layout, Row } from 'antd';
import styles from './DiagnosticStatistic.module.less';
import DiagnosticStatisticItem from './DiagnosticStatisticItem';

type DiagnosticStatisticProps = {
  statistic: {
    totalCount: number;
    remainingRunCount: number;
    cleansedRunCount: number;
  };
};

const cleansedRunTooltip =
  'The count of runs that have been marked as cleansed and completed for the associated schemas.';
const remainingRunTooltip = 'The count of runs that need to be cleansed for the associated schemas.';
const totalTooltip = 'The count of runs for the associated schemas.';

const DiagnosticStatistic: React.FC<DiagnosticStatisticProps> = ({ statistic }) => {
  const getTooltip = (text: string) => {
    return <div className={styles.diagnostic_tooltip}>{text}</div>;
  };

  return (
    <Layout>
      <Row className={styles.diagnostic_statistic_wrapper}>
        <DiagnosticStatisticItem
          title={'Count of Total Runs'}
          count={statistic.totalCount}
          tooltip={getTooltip(totalTooltip)}
        />
        <DiagnosticStatisticItem
          title={'Count of Remaining Runs'}
          count={statistic.remainingRunCount}
          tooltip={getTooltip(remainingRunTooltip)}
        />
        <DiagnosticStatisticItem
          title={'Count of Cleansed Runs'}
          count={statistic.cleansedRunCount}
          tooltip={getTooltip(cleansedRunTooltip)}
        />
      </Row>
    </Layout>
  );
};

export default DiagnosticStatistic;
