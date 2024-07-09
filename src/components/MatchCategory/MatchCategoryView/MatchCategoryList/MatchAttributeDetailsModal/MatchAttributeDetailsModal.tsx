import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MatchAttributeDetailsModal.module.less';
import MatchAttributeDetailsList from './MatchAttributeDetailsList';

type MatchAttributeDetailsModalProps = {
  matchAttribute: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const MatchAttributeDetailsModal: React.FC<MatchAttributeDetailsModalProps> = ({ matchAttribute, visible, setVisible }) => {
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      {matchAttribute && matchAttribute.ID && (
        <Drawer
          placement="bottom"
          closable={false}
          onClose={onClose}
          visible={visible}
          height={'100%'}
          className={styles.match_attribute_details_drawer}
        >
          <Button onClick={onClose} className={styles.close_button} type="link">
            <FontAwesomeIcon icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
          </Button>
          {visible && <MatchAttributeDetailsList matchAttribute={matchAttribute} />}
        </Drawer>
      )}
    </>
  );
};

export default MatchAttributeDetailsModal;
