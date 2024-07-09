import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MetadataModal.module.less';
import MetadataView from './MetadataView';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

type MetadataModalProps = {
  site: SiteManagementInfo;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const MetadataModal: React.FC<MetadataModalProps> = ({ site, visible, setVisible }) => {
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
          className={styles.metadata_drawer}
        >
          <Button onClick={onClose} className={styles.metadata_close_button} type="link">
            <FontAwesomeIcon icon={['fal', 'times']} className={styles.metadata_close_icon} size={'3x'} />
          </Button>
          {visible && <MetadataView site={site} />}
        </Drawer>
      )}
    </>
  );
};

export default MetadataModal;
