import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SiteClientsModal.module.less';
import SiteClientsView from './SiteClientsView';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

type SiteClientsModalProps = {
  site: SiteManagementInfo;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const SiteClientsModal: React.FC<SiteClientsModalProps> = ({ site, visible, setVisible }) => {
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      {site && (
        <Drawer
          placement="bottom"
          closable={false}
          onClose={onClose}
          visible={visible}
          height={'100%'}
          className={styles.site_clients_drawer}
        >
          <Button onClick={onClose} className={styles.site_clients_close_button} type="link">
            <FontAwesomeIcon icon={['fal', 'times']} className={styles.site_clients_close_icon} size={'3x'} />
          </Button>
          {visible && <SiteClientsView site={site} />}
        </Drawer>
      )}
    </>
  );
};

export default SiteClientsModal;
