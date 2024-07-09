import React, { useState, useEffect } from 'react';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import { Switch as AntSwitch } from 'antd';
import styles from './NoMatchFilter.module.less';
import clsx from 'clsx';

export type FilterOption = {
  label?: string;
  checked?: boolean;
  disabled?:boolean;
};
export type SwitchProps = {
  label?: string;
  short?: boolean;
  onChange: Function;
  options?: FilterOption;
  defaultChecked: boolean;
  disabled:boolean;
};

const propps = {
  label: "Include Unmatched",
  defaultChecked:false,
  onChange: (): void => {
    console.log('toggle admin node');
  },
};
const NoMatchFilter: React.FC<SwitchProps> = ({
  defaultChecked = false,
  onChange,
  disabled,
}: SwitchProps) => {
  const { label, short, ...props }:any = propps;
  const setQuery = useQueryUrlParamsDispatch();
  const [checked, setChecked] = useState(defaultChecked);
  useEffect(() => {
    if (JSON.stringify(defaultChecked) !== JSON.stringify(checked)) {
      setChecked(defaultChecked);
    }
   }, [defaultChecked, checked]);
  
  const handleOptionsChange = (checked: boolean): void => {
    setChecked(checked);
    if(disabled){
      onChange('noMatch', false );
      setQuery({ noMatch: false, back:false });
      onChange(localStorage.removeItem('URL'))
      onChange(localStorage.removeItem('pageVal'))
    }else{
      onChange('noMatch', checked);
      setQuery({ noMatch: checked, back:false });
      onChange(localStorage.removeItem('URL'))
      onChange(localStorage.removeItem('pageVal'))
    }
  };
  return (
    <>
      <div className={styles.matches_filter_wrapper}>
     {label ?(      
        <div>
          <label className={styles.label_wrapper}>
            {disabled &&  ( 
              <AntSwitch className={styles.switch} 
            {...props} 
            defaultChecked={false} 
            onChange={handleOptionsChange} 
            size={"small"} 
            disabled={disabled}
            />
            )}
            {!disabled &&  ( 
              <AntSwitch className={styles.switch} 
            {...props} 
            defaultChecked={defaultChecked} 
            onChange={handleOptionsChange} 
            size={"small"} 
            disabled={disabled}
            />
            )}
            <span className={clsx(styles.label, { [styles.label_short]: short })} style={{marginLeft:'10px'}}>{label}</span>
          </label>
        </div>
    ) : (
      <AntSwitch className={clsx(styles.switch)} {...props}
      defaultChecked={defaultChecked} />
    )}  
      
      </div>
    </>
  );
};
export default NoMatchFilter;
