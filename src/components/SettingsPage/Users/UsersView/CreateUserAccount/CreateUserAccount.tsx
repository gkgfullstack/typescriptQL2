import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CreateUserAccount.module.less';
import CreateUserAccountForm from './CreateUserAccountForm';
import { useCreateUserAccount } from 'src/api/userAccounts';

type CreateUserAccountProps = {
  onUpdate: () => void;
};

const CreateUserAccount: React.FC<CreateUserAccountProps> = ({ onUpdate }) => {
  const [visible, setVisible] = useState(false);
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

  const onCreateAccount = (values: any) => {
    setSavedAccount(values);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} style={{ width: '100%', maxWidth: '170px' }}>
        <FontAwesomeIcon
          icon={['fal', 'plus']}
          className={styles.chevronDown}
          size="lg"
          style={{ marginRight: '10px' }}
        />{' '}
        Create New Account
      </Button>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        height={'100%'}
        className={styles.create_new_account_drawer}
      >
        <Button onClick={onClose} style={{ float: 'right', position: 'absolute', right: '0' }} type="link">
          <FontAwesomeIcon
            onClick={showDrawer}
            icon={['fal', 'times']}
            style={{ cursor: 'pointer', marginRight: '10px' }}
            size={'3x'}
          />
        </Button>
        {visible && <CreateUserAccountForm onSave={onCreateAccount} errorMessage={errorMessage} />}
      </Drawer>
    </>
  );
};

export default CreateUserAccount;
