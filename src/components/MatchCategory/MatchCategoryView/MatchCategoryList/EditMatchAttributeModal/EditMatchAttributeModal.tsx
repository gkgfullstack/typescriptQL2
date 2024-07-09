import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EditMatchAttributeModal.module.less';
import EditMatchAttributeForm from './EditMatchAttributeForm';
import { useCreateMatchAttribute } from 'src/api/matchAttribute';

type EditMatchAttributeModalProps = {
  visible: boolean;
  setVisible: any;
  matchAttribute: any;
  onUpdate: any;
};

const EditMatchAttributeModal: React.FC<EditMatchAttributeModalProps> = ({
  visible,
  setVisible,
  matchAttribute,
  onUpdate,
}) => {
  const [savedMatchCategory, setSavedMatchCategory] = useState(null);

  useCreateMatchAttribute(savedMatchCategory, onUpdate);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSavedMatchCategory(null);
  };

  const onCreateMatchAttribute = (values: any) => {
    setVisible(false);
    setSavedMatchCategory(values);
  };

  return (
    <Drawer
      placement="bottom"
      closable={false}
      onClose={onClose}
      visible={visible}
      height={'100%'}
      className={styles.create_new_drawer}
    >
      <Button onClick={onClose} className={styles.close_button} type="link">
        <FontAwesomeIcon onClick={showDrawer} icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
      </Button>
      {visible && <EditMatchAttributeForm matchAttribute={matchAttribute} onSave={onCreateMatchAttribute} />}
    </Drawer>
  );
};

export default EditMatchAttributeModal;
