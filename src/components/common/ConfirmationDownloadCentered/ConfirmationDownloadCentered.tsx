import React, {ReactElement} from 'react';
import { Modal } from 'antd';
import styles from './ConfirmationDownloadCentered.module.less';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle
} from 'src/setupIcons';
type ConfirmationCenteredProps = {
  title: string | ReactElement;
  name: string;
  confirmationVisible: boolean;
  setVisible: any;
  onAction: any;
  okText?: string;
  cancelText?: string;
  message:string;
};

const ConfirmationDownloadCentered: React.FC<ConfirmationCenteredProps> = ({
  title,
  name,
  confirmationVisible,
  setVisible,
  onAction,
  okText,
  cancelText,
  message
}) => {
  const closeModal = () => {
    setVisible(false);
  };

  const onConfirm = () => {
    setVisible(false);
    onAction();
  };

  const getTitle = () => {
    if (React.isValidElement(title)) {
      return title;
    }

    if (!name) {
      return `${title}`;
    }

    return (<div style={{textAlign:"left"}}>
    <h3 style={{fontWeight:600, fontSize:'16px'}}><span style={{width:'14px', height:'14px', backgroundColor:'#d96941', marginRight:'10px',     display: 'inline-block'}}></span>Confirm</h3>
      
      </div>
    );
  };

  return (
    <Modal
      title={getTitle()}
      centered
      visible={confirmationVisible}
      onOk={onConfirm}
      onCancel={closeModal}
      okText={okText ? okText : 'Yes'}
      cancelText={cancelText ? cancelText : 'No'}
      className={styles.confirmation_centered}
    > 
      <p style={{fontWeight:300, fontSize:'12px'}}> <FontAwesomeIcon icon={faInfoCircle} style={{color:'#d96941', fontSize:'16px'}}/> {message} </p>
      <h5 style={{fontWeight:400, fontSize:'14px'}}>{name}</h5>
    </Modal>  
  );
};

export default ConfirmationDownloadCentered;
