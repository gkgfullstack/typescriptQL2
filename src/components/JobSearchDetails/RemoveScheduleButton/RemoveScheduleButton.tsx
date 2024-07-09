import React from 'react';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popconfirm } from 'antd';
import Schedule from 'src/types/Schedule';
import clsx from 'clsx';
import { useScheduleRemovingState } from './hooks';
//import SubmittedRequestPopover from '../SubmittedRequestPopover';

import styles from './RemoveScheduleButton.module.less';
import { TooltipPlacement } from 'antd/lib/tooltip';

export type RemoveScheduleButtonProps = {
  scheduleItem: Schedule;
  className?: string;
  tooltipPlacement?: TooltipPlacement;
};

const RemoveScheduleButton: React.FC<RemoveScheduleButtonProps> = ({
  scheduleItem,
  className,
  tooltipPlacement,
}: RemoveScheduleButtonProps) => {
  const [{ loading, data, error }, { removeSchedule }] = useScheduleRemovingState();
  //const [showSubmittedPopover, setShowSubmittedPopover] = useState(false);
  const disabled = loading || (scheduleItem );
  const handleDeleteConfirm = () => {
    if (removeSchedule) {
      removeSchedule(scheduleItem);
    }
  };

  React.useEffect(() => {
    if (error) {
      notification.error({ message: error.message || error });
    }
  }, [error]);

  React.useEffect(() => {
    let timer: NodeJS.Timer;
    if (data !== null && data === 'Success') {
      //setShowSubmittedPopover(true);
      timer = setTimeout(() => {
       // setShowSubmittedPopover(false);
      }, 800);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data]);

  return (
    //<SubmittedRequestPopover visible={showSubmittedPopover} placement={tooltipPlacement || 'bottom'}>
      <Popconfirm
        title="Are you sure you want to remove this schedule?"
        okText="No, keep it for now"
        cancelText="Yes, I am sure"
        placement={tooltipPlacement || 'bottom'}
        icon={null}
        onCancel={handleDeleteConfirm}
        //disabled={disabled}
      >
        <FontAwesomeIcon
          icon={['fal', 'trash-alt']}
          size={'sm'}
          className={clsx(styles.icon, { [styles.disabled]: disabled }, className)}
        />
      </Popconfirm>
   // </SubmittedRequestPopover>
  );
};

export default RemoveScheduleButton;
