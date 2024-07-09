import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './DeleteConfirmation.module.less';
import DeleteConfirmationForm from './DeleteConfirmationForm';
import { useDeleteMaxRun } from 'src/api/retailDiagnostic';

type DeleteConfirmationProps = {
  deletedGroup: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setDeletedGroup: any;
  onUpdate: () => void;
};

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  deletedGroup,
  visible = false,
  setVisible,
  setDeletedGroup,
  onUpdate,
}) => {
  const [password, setPassword] = useState('');
  const [deletedGroupSchema, setDeletedGroupSchema] = useState('');
  const [deletedGroupId, setDeletedGroupId] = useState('');
  useDeleteMaxRun(deletedGroupSchema, deletedGroupId, setDeletedGroupId, onUpdate);

  useEffect(() => {
    if (!visible) {
      setPassword('');
    }
  }, [visible]);

  const onClose = () => {
    setVisible(false);
  };

  const onDeleteConfirm = () => {
    setVisible(false);
    setDeletedGroupSchema(deletedGroup.schemaName);
    setDeletedGroupId(deletedGroup.ID);
    setDeletedGroup(null);
  };

  const disabledDelete = () => {
    return password.trim().toLowerCase() !== 'delete';
  };

  return (
    <>
      <Modal
        onOk={onDeleteConfirm}
        onCancel={onClose}
        visible={visible}
        className={styles.delete_confirmation_wrapper}
        footer={[
          <Button key="back" onClick={onClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" disabled={disabledDelete()} onClick={onDeleteConfirm}>
            Delete
          </Button>,
        ]}
      >
        {visible && <DeleteConfirmationForm name={deletedGroup.name} setPassword={setPassword} />}
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
