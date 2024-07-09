import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';

import styles from './SubmittedRequestPopover.module.less';

export type SubmittedRequestPopoverProps = {
  placement?: TooltipPlacement;
  visible: boolean;
  children: React.ReactNode;
};

const popoverContent = (
  <div className={styles.container}>
    <p className={styles.icon}>
      <FontAwesomeIcon icon={['fal', 'check-circle']} size={'4x'} />
    </p>
    <p>Thank you for submitting your request. You will be notified once the change has been made.</p>
  </div>
);

const SubmittedRequestPopover: React.FC<SubmittedRequestPopoverProps> = ({
  placement,
  visible,
  children,
}: SubmittedRequestPopoverProps) => {
  return (
    <Popover content={popoverContent} trigger={'click'} visible={visible} placement={placement || 'top'}>
      {children}
    </Popover>
  );
};

export default SubmittedRequestPopover;
