import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FingerprintModal.module.less';
import FingerprintView from './FingerprintView';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

type FingerprintModalProps = {
  site: SiteManagementInfo;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const FingerprintModal: React.FC<FingerprintModalProps> = ({ site, visible, setVisible }) => {
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
          className={styles.fingerprint_drawer}
        >
          <Button onClick={onClose} className={styles.fingerprint_close_button} type="link">
            <FontAwesomeIcon icon={['fal', 'times']} className={styles.fingerprint_close_icon} size={'3x'} />
          </Button>
          {visible && <FingerprintView site={site} />}
        </Drawer>
      )}
    </>
  );
};

export default FingerprintModal;
