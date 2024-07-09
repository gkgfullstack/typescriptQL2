import React from 'react';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popconfirm } from 'antd';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';
import clsx from 'clsx';
import { useSearchDtlRemovingState } from './hooks';
//import SubmittedRequestPopover from '../SubmittedRequestPopover';

import styles from './RemoveSearchDtlButton.module.less';
import { TooltipPlacement } from 'antd/lib/tooltip';

export type RemoveSearchDtlButtonProps = {
  searchDtlItem: SearchDtlListInfo;
  className?: string;
  tooltipPlacement?: TooltipPlacement;
};

const RemoveSearchDtlButton: React.FC<RemoveSearchDtlButtonProps> = ({
  searchDtlItem,
  className,
  tooltipPlacement,
}: RemoveSearchDtlButtonProps) => {
  const [{ loading, data, error }, { removeSearchDtl }] = useSearchDtlRemovingState();
  //const [showSubmittedPopover, setShowSubmittedPopover] = useState(false);
  const disabled = loading || (searchDtlItem );
  const handleDeleteConfirm = () => {
    if (removeSearchDtl) {
      removeSearchDtl(searchDtlItem);
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
        //setShowSubmittedPopover(false);
      }, 800);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data]);

  return (
  //  <SubmittedRequestPopover visible={showSubmittedPopover} placement={tooltipPlacement || 'bottom'}>
      <Popconfirm
        title="Are you sure you want to remove these inputs?"
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
    //</SubmittedRequestPopover>
  );
};

export default RemoveSearchDtlButton;
