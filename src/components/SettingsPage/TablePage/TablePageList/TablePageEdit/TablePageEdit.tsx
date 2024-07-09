import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './TablePageEdit.module.less';
import EditTableView from './EditTableView';

type MetadataModalProps = {
  site: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onUpdateEditTable:any;
};

const TablePageEdit: React.FC<MetadataModalProps> = ({ site, visible, setVisible, onUpdateEditTable}) => {
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
          {visible && <EditTableView requestParams={site} setVisible={setVisible} onUpdateEditTable={onUpdateEditTable} />}
        </Drawer>
      )}
    </>
  );
};

export default TablePageEdit;
