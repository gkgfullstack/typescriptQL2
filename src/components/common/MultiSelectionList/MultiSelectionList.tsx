import React, { useState, SyntheticEvent } from 'react';
import { Input, Checkbox } from 'antd';
import styles from './MultiSelectionList.module.less';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import Spin from 'src/components/common/Spin';

type MultiSelectionItem = {
  label: string;
  value: string;
};

type MultiSelectionListProps = {
  onSearch: Function;
  onChange: (checkedValue: Array<CheckboxValueType>) => void;
  data: MultiSelectionItem[];
  loading?: boolean;
  defaultValue?: Array<CheckboxValueType>;
  value?: Array<CheckboxValueType>;
  placeholder?: string;
};

const MultiSelectionList: React.FC<MultiSelectionListProps> = ({
  onSearch,
  onChange,
  data = [],
  defaultValue,
  value,
  loading = false,
  placeholder = '',
}: MultiSelectionListProps) => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (e: SyntheticEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setSearchValue(value);
    onSearch(value);
  };
  return (
    <div className={styles.checkbox_group_with_search}>
      <Spin spinning={loading}>
        <Input.Search placeholder={placeholder} allowClear onChange={handleSearch} />
        <div className={styles.checkbox_group_wrapper}>
          {searchValue && data.length === 0 ? (
            'No items found'
          ) : (
            <Checkbox.Group options={data} value={value} defaultValue={defaultValue} onChange={onChange}>
              {data.map((checkbox, index) => (
                <Checkbox key={index} value={checkbox.value}>
                  {checkbox.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
          )}
        </div>
      </Spin>
    </div>
  );
};
export default MultiSelectionList;
