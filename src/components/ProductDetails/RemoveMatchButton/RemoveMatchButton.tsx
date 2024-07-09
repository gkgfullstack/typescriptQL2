import React, { useState } from 'react';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popconfirm } from 'antd';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import clsx from 'clsx';
import { useMatchRemovingState } from './hooks';
import SubmittedRequestPopover from '../SubmittedRequestPopover';

import styles from './RemoveMatchButton.module.less';
import { TooltipPlacement } from 'antd/lib/tooltip';

export type RemoveMatchButtonProps = {
  matchItems?: ProductMatchInfo[];
  className?: string;
  tooltipPlacement?: TooltipPlacement;
  selectedRowsss:any
};

const RemoveMatchButton: React.FC<RemoveMatchButtonProps> = ({
  matchItems,
  className,
  tooltipPlacement,
  selectedRowsss,
}: RemoveMatchButtonProps) => {
  const [{ loading, data, error }, { removeMatch }] = useMatchRemovingState();
  const [showSubmittedPopover, setShowSubmittedPopover] = useState(false);
  const disabled = loading;
  function handleDeleteConfirm() {
    if (removeMatch && matchItems) {
      removeMatch(matchItems);
    }
    let timer: NodeJS.Timer;
    if (data !== null && data.statusCode === '200') {
      selectedRowsss();
      setShowSubmittedPopover(true);
      timer = setTimeout(() => {
        selectedRowsss();
        setShowSubmittedPopover(false);
      }, 800);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  };

  React.useEffect(() => {
    if (error) {
      notification.error({ message: error.message || error });
    }
  }, [error]);

  React.useEffect(() => {
    let timer: NodeJS.Timer;
    if (data !== null && data.statusCode === '200') {
      selectedRowsss();
      setShowSubmittedPopover(true);
      timer = setTimeout(() => {
        selectedRowsss();
        setShowSubmittedPopover(false);
      }, 800);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data, selectedRowsss]);

  return (
    <SubmittedRequestPopover visible={showSubmittedPopover} placement={tooltipPlacement || 'bottom'}>
      <Popconfirm
        title="Are you sure you want to remove these match(es)?"
        okText="No, keep it for now"
        cancelText="Yes, I am sure"
        placement={tooltipPlacement || 'bottom'}
        icon={null}
        onCancel={handleDeleteConfirm}
        disabled={disabled}
      >
        {/* <FontAwesomeIcon
          icon={['fal', 'minus-circle']}
          size={'sm'}
          className={clsx(styles.icon, { [styles.disabled]: disabled }, className)}
        /> */}
        <FontAwesomeIcon icon={['fal', 'trash-alt']} 
          className={clsx(styles.icon, { [styles.disabled]: disabled }, className)}/>
      </Popconfirm>
    </SubmittedRequestPopover>
  );
};

export default RemoveMatchButton;
