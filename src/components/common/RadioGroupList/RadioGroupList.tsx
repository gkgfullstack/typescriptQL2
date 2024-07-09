import React from 'react';
import { Radio } from 'antd';
import { CheckboxOptionType } from 'antd/lib/checkbox/Group';
import { RadioChangeEvent } from 'antd/lib/radio';
import styles from './RadioGroupList.module.less';

type RadioGroupListProps = {
  defaultValue?: any;
  value?: any;
  options: Array<CheckboxOptionType>;
  onChange: Function;
};

const RadioGroupList: React.FC<RadioGroupListProps> = ({
  defaultValue,
  value,
  options,
  onChange,
}: RadioGroupListProps) => {
  const onChangeRadioGroup = (e: RadioChangeEvent): void => {
    const value = e.target.value;
    onChange(value);
  };
  return (
    <Radio.Group name="radiogroup" onChange={onChangeRadioGroup} value={value} defaultValue={defaultValue}>
      {options.map((option, index) => (
        <Radio className={styles.radiogroup_button} key={index} disabled={option.disabled} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};
export default RadioGroupList;
