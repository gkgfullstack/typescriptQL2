import React from 'react';
import { Button, Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './StatusPageModal.module.less';
import StatusPageView from './StatusPageView';

type StatusPageModalProps = {
  runId: string | null;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const StatusPageModal: React.FC<StatusPageModalProps> = ({ runId, visible, setVisible }) => {
  return (
    <>
      {runId && (
        <Drawer
          placement="bottom"
          closable={false}
          onClose={() => setVisible(false)}
          visible={visible}
          height={'100%'}
          className={styles.status_page_drawer}
        >
          <Button onClick={() => setVisible(false)} className={styles.status_page_close_button} type="link">
            <FontAwesomeIcon icon={['fal', 'times']} className={styles.status_page_close_icon} size={'3x'} />
          </Button>
          {visible && <StatusPageView runId={runId} />}
        </Drawer>
      )}
    </>
  );
};

export default StatusPageModal;
