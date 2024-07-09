import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal as AntModal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

import './Modal.less';

const { info, success, error, warn, warning, confirm, destroyAll } = AntModal;

class Modal extends React.Component<ModalProps, {}> {
  static info = info;
  static success = success;
  static error = error;
  static warn = warn;
  static warning = warning;
  static confirm = confirm;
  static destroyAll = destroyAll;

  render(): JSX.Element {
    const { closeIcon, ...props } = this.props;
    const modalCloseIcon: React.ReactNode = closeIcon || (
      <FontAwesomeIcon icon={['fal', 'times']} className="ql_modal_close_icon" size={'lg'} />
    );

    return <AntModal {...props} closeIcon={modalCloseIcon} />;
  }
}

export default Modal;
