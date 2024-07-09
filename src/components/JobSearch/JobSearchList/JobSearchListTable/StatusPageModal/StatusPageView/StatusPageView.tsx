import React from 'react';
import styles from './StatusPageView.module.less';
import StatusPageTable from './StatusPageTable';

type StatusPageViewProps = {
  runId: string | null;
};

const StatusPageView: React.FC<StatusPageViewProps> = ({ runId }) => {
  return (
    <>
      <h1 className={styles.status_page_title}>Status Page</h1>
      <StatusPageTable runId={runId} />
    </>
  );
};
export default StatusPageView;
