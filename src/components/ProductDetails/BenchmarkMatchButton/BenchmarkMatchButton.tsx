import React from 'react';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popconfirm } from 'antd';
import clsx from 'clsx';
import { useMatchBenchmarkState } from './hooks';
//import SubmittedRequestPopoverBenchMark from '../SubmittedRequestPopoverBenchMark';

import styles from './BenchmarkMatchButton.module.less';
import { TooltipPlacement } from 'antd/lib/tooltip';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';

export type BenchmarkMatchButtonProps = {
  matchItems: ProductMatchInfo[] | undefined;
    className?: string;
  tooltipPlacement?: TooltipPlacement;
  selectedRowsss: () => void;
};

const BenchmarkMatchButton: React.FC<BenchmarkMatchButtonProps> = ({
  matchItems,
  className,
  tooltipPlacement,
  selectedRowsss,
}: BenchmarkMatchButtonProps) => {
  const [{ loading, data, error }, { benchmarkMatch }] = useMatchBenchmarkState();
  //const [showSubmittedPopover, setShowSubmittedPopover] = useState(false);

  const disabledes = loading;
  // function handleDeleteConfirm() {
  //   if (benchmarkMatch) {
  //     if(matchItems)
  //     benchmarkMatch(matchItems);
  //   }
  // };


  function  handleDeleteConfirmBench() { 
    //let selectedRowsNew:ProductMatchInfo[] = []   
    if (benchmarkMatch && matchItems) {
      benchmarkMatch(matchItems);      
    }
    if(data !== null && data.statusCode === '200'){
      selectedRowsss()
    }
  
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
        title="Are you sure you want to benchmark this match?"
        okText="No, keep it for now"
        cancelText="Yes, I am sure"
        placement={tooltipPlacement || 'bottom'}
        icon={null}
        onCancel={handleDeleteConfirmBench}
        disabled={disabledes}
      >
        {/* <FontAwesomeIcon
          icon={['fal', 'minus-circle']}
          size={'sm'}
          className={clsx(styles.icon, { [styles.disabled]: disabled }, className)}
        /> */}
        <FontAwesomeIcon icon={['fal', 'bookmark']}
          className={clsx(styles.icon, { [styles.disabled]: disabledes }, className)}/>
      </Popconfirm>
  );
};

export default BenchmarkMatchButton;
