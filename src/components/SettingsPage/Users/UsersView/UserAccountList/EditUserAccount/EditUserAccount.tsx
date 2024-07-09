import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EditUserAccount.module.less';
import EditUserAccountForm from './EditUserAccountForm';
import { useCreateUserAccount } from 'src/api/userAccounts';
import { UserAccountInfo } from 'src/types/UserAccountInfo';

type EditUserAccountProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  userAccount: UserAccountInfo;
  onUpdate: (length: number) => void;
};

const EditUserAccount: React.FC<EditUserAccountProps> = ({ visible, setVisible, userAccount, onUpdate }) => {
  const [savedAccount, setSavedAccount] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  useCreateUserAccount(savedAccount, onUpdate, setErrorMessage, setVisible);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSavedAccount(null);
    setErrorMessage('');
  };

  const onEditAccount = (values: any) => {
    setSavedAccount(values);
  };

  return (
    <>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        height={'100%'}
        className={styles.edit_account_drawer}
      >
        <Button onClick={onClose} className={styles.edit_account_close_button} type="link">
          <FontAwesomeIcon
            onClick={showDrawer}
            icon={['fal', 'times']}
            className={styles.edit_account_close_icon}
            size={'3x'}
          />
        </Button>
        {visible && (
          <EditUserAccountForm onSave={onEditAccount} userAccount={userAccount} errorMessage={errorMessage} />
        )}
      </Drawer>
    </>
  );
};

export default EditUserAccount;
