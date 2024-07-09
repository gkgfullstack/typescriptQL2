import React from 'react';
import AssortmentReport from './AssortmentReport';
import { useAssortmentReportFetch } from './hooks';
import { Alert, Icon, Spin } from 'antd';
import Widget from 'src/components/common/Widget';

import styles from './Assortment.module.less';

const antIcon = <Icon type="loading" spin />;

type AssortmentProps = {};
const Assortment: React.FC<AssortmentProps> = () => {
  //const reportUrl =
  'http://reports-up.ql2.com/trusted/049474030/views/March_Testing/Dashboard2?:iid=2?&:embed=yes&:comments=no&:toolbar=yes&:refresh&:revert=all#3';

  const [{ data: reportUrl, loading, error }] = useAssortmentReportFetch();
  console.log(reportUrl);
  return (
    <Widget>
      {error && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get report! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {loading && !error ? (
        <div className={styles.insights_loader_container}>
          <Spin indicator={antIcon} size={'large'} spinning={loading} />
        </div>
      ) : null}
      {reportUrl !== null && <AssortmentReport url={reportUrl} />}
    </Widget>
  );
};

export default Assortment;
