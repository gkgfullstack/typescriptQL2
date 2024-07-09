import React from 'react';
import InteractiveReport from './InteractiveReport';
import { useInterActiveReportListFetch } from './hooks';
import { Alert, Icon, Spin } from 'antd';
import Widget from 'src/components/common/Widget';

import styles from './Interactive.module.less';

const antIcon = <Icon type="loading" spin />;

type InsightsProps = {};
const Interactive: React.FC<InsightsProps> = () => {
  
  const [{ data: reportList, loading, error }] = useInterActiveReportListFetch();
 console.log(reportList);
  return (
    <Widget>
      {error && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get report List! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {loading && !error ? (
        <div className={styles.insights_loader_container}>
          <Spin indicator={antIcon} size={'large'} spinning={loading} />
        </div>
      ) : null}
      {reportList !== null && ( <InteractiveReport reportList ={reportList } />
      )}
    </Widget>
  );
};

export default Interactive;
