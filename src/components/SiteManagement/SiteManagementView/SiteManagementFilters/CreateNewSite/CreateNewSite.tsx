import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CreateNewSite.module.less';
import CreateNewSiteForm from './CreateNewSiteForm';
import { useCreateNewSite } from 'src/api/createNewConfigureSite';

type CreateNewClientProps = {
  onUpdate: () => void;
};

const CreateNewSite: React.FC<CreateNewClientProps> = ({ onUpdate }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const schema = urlParams.get('schema') ? urlParams.get('schema')?.toString() : undefined;
  const [visible, setVisible] = useState(false);
  const [savedClient, setSavedClient] = useState(null);
  useCreateNewSite(savedClient, onUpdate, schema);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSavedClient(null);
  };

  const onCreateSite = (values: any) => {
    setVisible(false);
    setSavedClient(values);
  };

  return (
    <>
      <Button
        type="primary"
        disabled={!schema}
        title={'Select Vertical to create a new site'}
        onClick={showDrawer}
        className={styles.create_new_site_button}
      >
        <FontAwesomeIcon icon={['fal', 'plus']} className={styles.chevronDown} size="lg" />
        Create New Site
      </Button>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        height={'100%'}
        className={styles.create_new_site_drawer}
      >
        <Button onClick={onClose} className={styles.close_button} type="link">
          <FontAwesomeIcon onClick={onClose} icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
        </Button>
        {visible && <CreateNewSiteForm onSave={onCreateSite} />}
      </Drawer>
    </>
  );
};

export default CreateNewSite;
