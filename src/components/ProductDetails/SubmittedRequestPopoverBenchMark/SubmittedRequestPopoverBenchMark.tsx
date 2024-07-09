//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';

//import styles from './SubmittedRequestPopoverBenchMark.module.less';

export type SubmittedRequestPopoverProps = {
  placement?: TooltipPlacement;
  visible: boolean;
  children: React.ReactNode;
};

// const popoverContent = (
//   <div className={styles.container}>
//     <p className={styles.icon}>
//       <FontAwesomeIcon icon={['fal', 'check-circle']} size={'4x'} />
//     </p>
//     {/* <p>Thank you for submitting your request.</p> */}
//   </div>
// );

const SubmittedRequestPopoverBenchMark: React.FC<SubmittedRequestPopoverProps> = ({
  placement,
  visible,
  children,
}: SubmittedRequestPopoverProps) => {
  return (
    <Popover  trigger={'click'} visible={visible} placement={placement || 'top'}>
      {children}
    </Popover>
  );
};

export default SubmittedRequestPopoverBenchMark;
