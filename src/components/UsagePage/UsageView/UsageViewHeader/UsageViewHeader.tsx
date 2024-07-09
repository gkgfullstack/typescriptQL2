import styles from './UsageViewHeader.module.less';
import UsageTimeZoneFilter from '../UsageTimeZoneFilter';
import UsageToggle from '../UsageToggle';
import React from 'react';
import UserInfo from 'src/types/UserInfo';

type UsageViewHeaderProps = {
  user: UserInfo | undefined | null;
  onUpdateFilter: (name: string, value: string) => void;
  onUpdateUsage: (value: string) => void;
  isInputVisible: boolean;
  isOutputVisible: boolean;
  isSKUVisible: boolean;
};
const UsageViewHeader: React.FC<UsageViewHeaderProps> = ({
  user,
  onUpdateFilter,
  isInputVisible,
  isOutputVisible,
  isSKUVisible,
  onUpdateUsage,
}) => {
  return (
    <div className={styles.usage_view_header}>
      <h1>Current Usage</h1>
      <UsageTimeZoneFilter onUpdate={onUpdateFilter} />
      {user && (
        <UsageToggle
          isInputVisible={isInputVisible}
          isOutputVisible={isOutputVisible}
          isSKUVisible={isSKUVisible}
          onUpdate={onUpdateUsage}
        />
      )}
    </div>
  );
};

export default UsageViewHeader;
