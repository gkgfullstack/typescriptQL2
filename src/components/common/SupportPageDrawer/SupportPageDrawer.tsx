import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SupportPageDrawer.module.less';
import SupportPage from 'src/components/SupportPage';

type SupportPageDrawerProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const SupportPageDrawer: React.FC<SupportPageDrawerProps> = ({ visible, setVisible }) => {
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer
      placement="bottom"
      closable={false}
      onClose={onClose}
      visible={visible}
      height={'100%'}
      className={styles.support_page_drawer}
    >
      <Button onClick={onClose} className={styles.close_button} type="link">
        <FontAwesomeIcon onClick={onClose} icon={['fal', 'times']} className={styles.close_icon} size={'3x'} />
      </Button>
      {visible && <SupportPage onClose={onClose} />}
    </Drawer>
  );
};

export default SupportPageDrawer;
