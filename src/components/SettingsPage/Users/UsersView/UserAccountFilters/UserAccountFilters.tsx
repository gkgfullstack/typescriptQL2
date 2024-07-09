import React from 'react';
import styles from './UserAccountFilters.module.less';
import CreateUserAccount from '../CreateUserAccount';
import UserAccountFilter from './UserAccountFilter';

type UserAccountFiltersProps = {
  setParams: (name: string, value: string) => void;
  userDisabledCount: string;
  onUpdate: () => void;
};

const UserAccountFilters: React.FC<UserAccountFiltersProps> = ({ setParams, userDisabledCount, onUpdate }) => {
  return (
    <div className={styles.user_account_filter}>
      <CreateUserAccount onUpdate={onUpdate} />
      <UserAccountFilter setParams={setParams} userDisabledCount={userDisabledCount} />
    </div>
  );
};

export default UserAccountFilters;
