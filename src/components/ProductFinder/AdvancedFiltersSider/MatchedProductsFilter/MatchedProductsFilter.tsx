import React, { useState, useEffect } from 'react';
import Accordion from 'src/components/common/Accordion';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import { Checkbox } from 'antd';
import { CheckboxValueType, CheckboxOptionType } from 'antd/lib/checkbox/Group';
import styles from './MatchedProductsFilter.module.less';

const DEFAULT_OPTIONS = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: '6',
    value: '6',
  },
  {
    label: '7',
    value: '7',
  },
  {
    label: '8',
    value: '8',
  },
  {
    label: '9',
    value: '9',
  },
  {
    label: '10',
    value: '10',
  },
];

type MatchedProductsFilterProps = {
  defaultValue?: Array<CheckboxValueType>;
  onChange: Function;
  options?: Array<CheckboxOptionType>;
  header?: string;
};

const MatchedProductsFilter: React.FC<MatchedProductsFilterProps> = ({
  header = 'Number of Matched Products',
  defaultValue = [],
  onChange,
  options = DEFAULT_OPTIONS,
}: MatchedProductsFilterProps) => {
  const setQuery = useQueryUrlParamsDispatch();
  const [value, setValue] = useState<Array<CheckboxValueType>>(defaultValue);
  useEffect(() => {
    if (JSON.stringify(defaultValue) !== JSON.stringify(value)) {
      setValue(defaultValue);
    }
  }, [defaultValue, value]);

  const handleOptionsChange = (value: Array<CheckboxValueType>): void => {
    setValue(value);
    onChange('matches', value);
    setQuery({ matches: value, back:false }); 
    onChange(localStorage.removeItem('URL'))
    onChange(localStorage.removeItem('pageVal'))   
  };
  
  return (
    <Accordion header={header}>
      <div className={styles.matches_filter_wrapper} id="matches_filter_wrapper">
        <Checkbox.Group value={value} defaultValue={defaultValue} onChange={handleOptionsChange}>
          {options.map((option, index) => (
            <Checkbox key={index} value={option.value}>
              {index === options.length - 1 ? option.label + '+' : option.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </div>
    </Accordion>
  );
};
export default MatchedProductsFilter;
