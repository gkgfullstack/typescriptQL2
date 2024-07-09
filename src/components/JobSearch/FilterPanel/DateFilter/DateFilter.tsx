import React, { useEffect, useState } from 'react';
import {  Popover, Button } from 'antd';
import styles from './DateFilter.module.less';
//import { DateFilterFormProps } from './DateFilterForm/DateFilterForm';
import  WrappedDateFilterForm  from './DateFilterForm/DateFilterForm';
//import { TooltipPlacement } from 'antd/lib/tooltip';
import DateFilterQueryParams from 'src/types/DateFilterQueryParams'
import { TooltipPlacement } from 'antd/lib/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

 export type SearchBarProps =  {
  values?: any,
  tooltipPlacement?: TooltipPlacement
  onSubmit: (
    values?: any
  ) => void;
};

const DateFilter: React.FC<SearchBarProps> = ({
 values,
  onSubmit,
  tooltipPlacement
}: SearchBarProps) => {
  
  const [currValue, setValue] = useState(values);
  const [visibleForm, setFormVisibility] = useState(false);
  useEffect(() => {
    setValue(values);
  }, [values]);
  const handlerSearchEvent = (value: DateFilterQueryParams): void => {
    onSubmit(value);
    setFormVisibility(false);
  };

  const dateForm: React.ReactNode = (
    <WrappedDateFilterForm
      visible={visibleForm}
      values={currValue}
      onSubmit={handlerSearchEvent}
       />
  );
  const handleVisibleChange = (visible: boolean) => {
    setFormVisibility(visible);
  };
  return (
    <Popover
        trigger={'click'}
        content={dateForm}
        visible={visibleForm}
        onVisibleChange={handleVisibleChange}
        placement={tooltipPlacement || 'bottomRight'}
      >
        <Button style={{ marginRight: '10px', width: '100%', textAlign: 'left' }}>Filter <FontAwesomeIcon icon={['far', 'chevron-down']} className={styles.chevronDown} size="sm" style={{marginTop:'5px', float:'right'}}/></Button>
      </Popover>
  );
};

export default DateFilter;
