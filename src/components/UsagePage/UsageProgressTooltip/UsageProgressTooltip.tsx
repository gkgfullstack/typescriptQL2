import React from 'react';
import styles from './UsageProgressTooltip.module.less';
import UsageProgress from '../UsageView/UsageProgress';

type UsagePageProps = {};

const UsageProgressTooltip: React.FC<UsagePageProps> = () => {
  return (
    <div className={styles.usage_tooltip}>
      <UsageProgress />
    </div>
  );
};

export default UsageProgressTooltip;
