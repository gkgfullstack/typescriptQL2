import React from 'react';
import { Switch as AntSwitch, Tooltip } from 'antd';
import { SwitchProps as AntSwitchProps } from 'antd/lib/switch';

import styles from './Switch.module.less';
import clsx from 'clsx';

type SwitchProps = AntSwitchProps & {
  label?: string;
  className?: string;
  short?: boolean;
};

class Modal extends React.Component<SwitchProps, {}> {
  render(): JSX.Element {
    const { label, short, className, ...props } = this.props;

    return label ? (
      <Tooltip title={short ? label : ''} trigger={'hover'} placement="right">
        <div className={className}>
          <label className={styles.label_wrapper}>
            <AntSwitch className={styles.switch} {...props} />
            <span className={clsx(styles.label, { [styles.label_short]: short })}>{label}</span>
          </label>
        </div>
      </Tooltip>
    ) : (
      <AntSwitch className={clsx(styles.switch, className)} {...props} />
    );
  }
}

export default Modal;
