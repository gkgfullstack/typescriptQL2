import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EditLocationPriorityModal.module.less';
import EditLocationPriority from './EditLocationPriority';
import { useCreateMatchAttributeMap } from 'src/api/matchAttributeMap';

type EditLocationPriorityModalProps = {
  visible: boolean;
  setVisible: any;
  matchAttributeMap: any;
  onUpdate: any;
  setSelectedAttributeMatchMap: any;
};

const EditLocationPriorityModal: React.FC<EditLocationPriorityModalProps> = ({
  visible,
  setVisible,
  matchAttributeMap,
  onUpdate,
  setSelectedAttributeMatchMap,
}) => {
  const [savedMatchAttributeMaps, setMatchAttributeMaps] = useState(null);
  useCreateMatchAttributeMap(savedMatchAttributeMaps, onUpdate);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setMatchAttributeMaps(null);
  };

  const onSaveLocationPriority = (values: any) => {
    setVisible(false);
    setMatchAttributeMaps(values);
    setSelectedAttributeMatchMap(null);
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
      {visible && <EditLocationPriority matchAttributeMap={matchAttributeMap} onSave={onSaveLocationPriority} />}
    </Drawer>
  );
};

export default EditLocationPriorityModal;
