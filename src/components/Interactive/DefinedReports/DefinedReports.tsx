import React, { SyntheticEvent } from 'react';
import DefinedReport from './DefinedReport';
import {useDefinedReportFetch } from './hooks';
import { Alert, Icon, Spin } from 'antd';
import Widget from 'src/components/common/Widget';

import styles from './DefinedReports.module.less';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import { Link, useHistory } from 'react-router-dom';
import routes from 'src/routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const antIcon = <Icon type="loading" spin />;

type DefinedProps = {
 // reprtName:string
 };
const DefinedReports: React.FC<DefinedProps> = () => {
  //const reportUrl =
  const history = useHistory();
  const {name, rpt } = useQueryUrlParams();
  console.log(name);
   let reprtName=rpt;
  const [{ data: reportUrl, loading, error }] = useDefinedReportFetch(reprtName);
  console.log(reportUrl);
  return (
    <div>
    <div className={styles.actions_container}>
    <Link
      className={styles.back_link}
      to={routes.Interactive}
      onClick={(event: SyntheticEvent) => {
        if (window.history.state && window.history.state.key) {
          event.preventDefault();
          history.goBack();
        }
      }}
    >
      <FontAwesomeIcon icon={['far', 'chevron-left']} size={'xs'} className={styles.back_icon} />
      Back 
    </Link>
   
    </div>
    <h2>Report - {name.replace('||','&')}</h2>
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
      {reportUrl !== null && <DefinedReport url={reportUrl} />}
    </Widget>
    </div>
  );
};

export default DefinedReports;
