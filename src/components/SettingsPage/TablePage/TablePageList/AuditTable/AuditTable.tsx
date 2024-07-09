import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AuditTable.module.less';
import AuditTableView from './AuditTableView';

type MetadataModalProps = {
  site: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const AuditTable: React.FC<MetadataModalProps> = ({ site, visible, setVisible}) => { 
  const onCloseAudit = () => {
    setVisible(false);
  };

  return (
    <>
      {site && (
        <Drawer
          placement="bottom"
          closable={false}
          onClose={onCloseAudit}
          visible={visible}
          height={'100%'}
          className={styles.metadata_drawer}
        >
          <Button onClick={onCloseAudit} className={styles.metadata_close_button} type="link">
            <FontAwesomeIcon icon={['fal', 'times']} className={styles.metadata_close_icon} size={'3x'} />
          </Button>
          {visible && <AuditTableView  requestParams={site}/>}
        </Drawer>
      )}
    </>
  );
};

export default AuditTable;
