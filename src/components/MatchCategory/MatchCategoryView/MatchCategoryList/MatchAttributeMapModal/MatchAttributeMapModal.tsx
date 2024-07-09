import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MatchAttributeMapModal.module.less';
import MatchAttributeMapForm from './MatchAttributeMapForm';
import { useCreateMatchAttributeMap } from 'src/api/matchAttributeMap';

type MatchAttributeMapModalProps = {
  visible: boolean;
  setVisible: any;
  matchAttribute: any;
  matchAttributeMap?: any;
  onUpdate?: any;
  setSelectedAttributeMatchMap?: any;
};

const MatchAttributeMapModal: React.FC<MatchAttributeMapModalProps> = ({
  visible,
  setVisible,
  matchAttribute,
  matchAttributeMap,
  onUpdate,
  setSelectedAttributeMatchMap,
}) => {
  const [savedMatchAttributeMap, setSavedMatchAttributeMap] = useState<any[] | null>(null);
  useCreateMatchAttributeMap(savedMatchAttributeMap, onUpdate);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setSavedMatchAttributeMap(null);
    if (setSelectedAttributeMatchMap) {
      setSelectedAttributeMatchMap(null);
    }
  };

  const onCreateMatchAttribute = (values: any) => {
    setVisible(false);
    setSavedMatchAttributeMap([values]);
    if (setSelectedAttributeMatchMap) {
      setSelectedAttributeMatchMap(null);
    }
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
      {visible && (
        <MatchAttributeMapForm
          matchAttribute={matchAttribute}
          matchAttributeMap={matchAttributeMap}
          onSave={onCreateMatchAttribute}
        />
      )}
    </Drawer>
  );
};

export default MatchAttributeMapModal;
