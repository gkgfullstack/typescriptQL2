import React, {ReactElement} from 'react';
import { Modal } from 'antd';
import styles from './ConfirmationCentered.module.less';

type ConfirmationCenteredProps = {
  title: string | ReactElement;
  name?: string;
  visible: boolean;
  setVisible: any;
  onAction: any;
  okText?: string;
  cancelText?: string;
};

const ConfirmationCentered: React.FC<ConfirmationCenteredProps> = ({
  title,
  name,
  visible,
  setVisible,
  onAction,
  okText,
  cancelText,
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
      return `${title}?`;
    }

    return (
      <span>
        {title} <span style={{ color: '#002D74' }}>{name}</span>?
      </span>
    );
  };

  return (
    <Modal
      title={getTitle()}
      centered
      visible={visible}
      onOk={onConfirm}
      onCancel={closeModal}
      okText={okText ? okText : 'Yes'}
      cancelText={cancelText ? cancelText : 'No'}
      className={styles.confirmation_centered}
    />
  );
};

export default ConfirmationCentered;
