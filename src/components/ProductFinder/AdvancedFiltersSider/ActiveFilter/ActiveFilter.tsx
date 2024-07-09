import React, { useState, useEffect } from 'react';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import { Switch as AntSwitch } from 'antd';
//import { SwitchProps as AntSwitchProps } from 'antd/lib/switch';
import styles from './ActiveFilter.module.less';
import clsx from 'clsx';

export type FilterOption = {
  label?: string;
  checked?: boolean;
};
export type SwitchProps = {
  label?: string;
  short?: boolean;
  onChange: Function;
  options?: FilterOption;
  defaultChecked: boolean;
};

const propps = {
  label: "Include Inactive",
  defaultChecked:false,
  onChange: (): void => {
    console.log('toggle admin node');
  },
  
};


const ActiveFilter: React.FC<SwitchProps> = ({
  defaultChecked = false,
  onChange,
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
    if(checked){
      onChange('noMatch', false);
      onChange('active', checked);
      setQuery({ noMatch: false , active: checked, back:false, s:null });
      onChange(localStorage.removeItem('URL'))
      onChange(localStorage.removeItem('pageVal'))
    }else{
      onChange('active', checked);
      setQuery({ active: checked, back:false, s:null  });
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
            <AntSwitch className={styles.switch} 
            {...props} 
            defaultChecked={defaultChecked} 
            onChange={handleOptionsChange} 
            size={"small"} 
            />
            <span className={clsx(styles.label, { [styles.label_short]: short })} style={{marginLeft:'10px'}}>{label}</span>
          </label>
        </div>
    ) : (
      <AntSwitch className={clsx(styles.switch)} {...props}
      defaultChecked={defaultChecked}  />
    )}      
      </div>
    </>
  );
};
export default ActiveFilter;
