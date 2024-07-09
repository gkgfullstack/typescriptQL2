import React, { useState } from 'react';
import { faToggleOff, faToggleOn } from '@fortawesome/pro-light-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './UserAccountFilter.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type UserAccountFilterProps = {
  setParams: (name: string, value: string) => void;
  userDisabledCount: string;
};

const faToggleOffIcon = faToggleOff as IconProp;
const faToggleOnIcon = faToggleOn as IconProp;

const UserAccountFilter: React.FC<UserAccountFilterProps> = ({ setParams, userDisabledCount }) => {
  const [isUserAccountDisabled, setUserAccountDisabled] = useState(false);

  const onToggle = () => {
    const updatedUserAccountDisabled = !isUserAccountDisabled;
    const userAccountDisabledId: string = updatedUserAccountDisabled ? '0' : '1';
    setParams('isUserAccountDisabled', userAccountDisabledId);
    setUserAccountDisabled(updatedUserAccountDisabled);
  };

  return (
    <p className={styles.user_account_filter}>
      <span className={styles.user_account_filter_label} onClick={onToggle}>
        Include Disabled Accounts {userDisabledCount && <span>({userDisabledCount})</span>}
      </span>
      {isUserAccountDisabled ? (
        <FontAwesomeIcon icon={faToggleOnIcon} className={styles.status_active_icon} onClick={onToggle} size="lg" />
      ) : (
        <FontAwesomeIcon onClick={onToggle} icon={faToggleOffIcon} className={styles.status_inactive_icon} size="lg" />
      )}
    </p>
  );
};

export default UserAccountFilter;
