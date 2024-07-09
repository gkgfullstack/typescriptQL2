import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './UploadTable.module.less';
import UploadTableView from './UploadTableView';
import UploadTableTypeFiles from 'src/types/UploadTableTypeFiles';

type MetadataModalProps = {
  site: any;
  visible: boolean;
  setVisible: any;
  onSubmit:(values:UploadTableTypeFiles) => void;
  uploadId:any;
  formatVal:any;
  onUpdateUploadTable:any;
};

const UploadTable: React.FC<MetadataModalProps> = ({ site, visible, setVisible, onSubmit, uploadId, formatVal, onUpdateUploadTable}) => { 
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
          key={1112}
        >
          <Button onClick={onCloseAudit} className={styles.metadata_close_button} type="link">
            <FontAwesomeIcon icon={['fal', 'times']} className={styles.metadata_close_icon} size={'3x'} />
          </Button>
          {visible && <UploadTableView setVisible={setVisible} formatVal={formatVal} onSubmit={onSubmit} uploadId={uploadId} onUpdateUploadTable={onUpdateUploadTable} />}
        </Drawer>
      )}
    </>
  );
};

export default UploadTable;
