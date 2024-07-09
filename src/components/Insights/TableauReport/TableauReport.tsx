import React from 'react';
import { Alert } from 'antd';

import styles from './TableauReport.module.less';

declare global {
  interface Window {
    tableau: any;
  }
}

export const errorMessage = 'Something went wrong... The report cannot be displayed';

export type TableauReportProps = {
  url: string;
};
const TableauReport: React.FC<TableauReportProps> = ({ url }: TableauReportProps) => {
  const ref = React.createRef<HTMLDivElement>();
  const viz = window.hasOwnProperty('tableau') && window.tableau.hasOwnProperty('Viz');
  React.useEffect(() => {
    if (ref && ref.current && viz && url) {
      new window.tableau.Viz(ref.current || document.body, url);
    }
  }, [ref, url, viz]);

  const showError = !window.hasOwnProperty('tableau') || url === '';

  return !showError ? (
    <div ref={ref} />
  ) : (
    <Alert message="Error" description={errorMessage} type="error" showIcon className={styles.error_message} />
  );
};

export default TableauReport;
