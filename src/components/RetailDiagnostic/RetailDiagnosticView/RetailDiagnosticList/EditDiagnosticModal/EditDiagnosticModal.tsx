import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EditDiagnosticModal.module.less';
import EditDiagnosticForm from './EditDiagnosticForm';
import { useUpdateMaxRun } from 'src/api/retailDiagnostic';
import RetailDiagnosticInfo from 'src/types/RetailDiagnosticInfo';

type EditDiagnosticModalProps = {
  maxRun: RetailDiagnosticInfo;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onUpdate: () => void;
};

const EditDiagnosticModal: React.FC<EditDiagnosticModalProps> = ({ maxRun, visible = false, setVisible, onUpdate }) => {
  const [updatedGroup, setUpdatedGroup] = useState<any>('');
  useUpdateMaxRun(updatedGroup, setUpdatedGroup, onUpdate);

  const onClose = () => {
    setVisible(false);
  };

  const onEditRun = (values: any) => {
    const newMaxRun: RetailDiagnosticInfo = {
      name: values.name,
      ID: maxRun.ID,
      searchType: maxRun.searchType,
      status: maxRun.status,
      cleansed: maxRun.cleansed,
      collectionType: maxRun.collectionType,
      externalSubscriberID: maxRun.externalSubscriberID,
      archiveCorrelationID: maxRun.archiveCorrelationID,
      schemaName: maxRun.schemaName,
    };
    setVisible(false);
    setUpdatedGroup([newMaxRun]);
  };

  return (
    <>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        height={'100%'}
        className={styles.edit_max_run_drawer}
      >
        <Button onClick={onClose} className={styles.close_button} type="link">
          <FontAwesomeIcon icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
        </Button>
        {visible && <EditDiagnosticForm maxRun={maxRun} onSave={onEditRun} />}
      </Drawer>
    </>
  );
};

export default EditDiagnosticModal;
