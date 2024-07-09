import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './TablePageDetails.module.less';
import DetailsTableView from './EditTableView';

type MetadataModalProps = {
  site: any;
  visible: boolean;
  setVisible: (visible: any) => void;
  editedVisible:any;
  deleteVisible:any;
  auditVisible:any;
  uploadVisible:any;
  clearVisible:any;
  onUpdateDeleted:any;
  onUpdateClear:any;
  onUpdateEditTable:any;
};

const TablePageDetails: React.FC<MetadataModalProps> = ({ 
  site, 
  visible, 
  setVisible, 
  editedVisible,
  deleteVisible,
  auditVisible,
  uploadVisible,
  clearVisible,
  onUpdateDeleted,
  onUpdateClear,
  onUpdateEditTable
}) => { 
  
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
          {visible && <DetailsTableView 
            editedVisible={editedVisible}
            deleteVisible={deleteVisible}
            auditVisible={auditVisible}
            uploadVisible={uploadVisible}
            clearVisible={clearVisible}
            requestParams={site}
            setVisible={setVisible} 
            onUpdateDeleted={onUpdateDeleted} 
            onUpdateClear={onUpdateClear}
            onUpdateEditTable={onUpdateEditTable}
          />}
        </Drawer>
      )}
    </>
  );
};

export default TablePageDetails;
