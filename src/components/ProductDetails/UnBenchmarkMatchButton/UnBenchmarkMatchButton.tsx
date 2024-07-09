import React from 'react';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popconfirm } from 'antd';
import clsx from 'clsx';
import { useMatchUnBenchmarkState } from './hooks';
//import SubmittedRequestPopoverBenchMark from '../SubmittedRequestPopoverBenchMark';

import styles from './UnBenchmarkMatchButton.module.less';
import { TooltipPlacement } from 'antd/lib/tooltip';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';

export type UnBenchmarkMatchButtonProps = {
  matchItems: ProductMatchInfo[] | undefined;
    className?: string;
  tooltipPlacement?: TooltipPlacement;
  selectedRowsss: () => void;
};

const UnBenchmarkMatchButton: React.FC<UnBenchmarkMatchButtonProps> = ({
  matchItems,
  className,
  tooltipPlacement,
  selectedRowsss
}: UnBenchmarkMatchButtonProps) => {
  const [{ loading, data, error }, { benchmarkMatch }] = useMatchUnBenchmarkState();
  //const [showSubmittedPopover, setShowSubmittedPopover] = useState(false);
  const disabledes = loading;

  function handleDeleteConfirmUn() {
    if (benchmarkMatch && matchItems) {
      benchmarkMatch(matchItems);
    }
    let timer: NodeJS.Timer;
    if (data !== null && data.statusCode === '200') {
      selectedRowsss();
      timer = setTimeout(() => {
        selectedRowsss();
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
      //setShowSubmittedPopover(true);
      selectedRowsss();
      timer = setTimeout(() => {
        //setShowSubmittedPopover(false);
        selectedRowsss();
      }, 800);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [data, selectedRowsss]);

  return (
      <Popconfirm
        title="Are you sure you want to un-benchmark this match?"
        okText="No, keep it for now"
        cancelText="Yes, I am sure"
        placement={tooltipPlacement || 'bottom'}
        icon={null}
        onCancel={handleDeleteConfirmUn}
        disabled={disabledes}
      >
        {/* <FontAwesomeIcon
          icon={['fal', 'minus-circle']}
          size={'sm'}
          className={clsx(styles.icon, { [styles.disabled]: disabled }, className)}
        /> */}
        <FontAwesomeIcon icon={['fas', 'bookmark']}
          className={clsx(styles.icon, { [styles.disabled]: disabledes }, className)}/>
      </Popconfirm>
  );
};

export default UnBenchmarkMatchButton;
