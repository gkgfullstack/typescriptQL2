import React, { ReactElement } from 'react';
import ConfigureClientFilter from 'src/types/ConfigureClientFilter';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import styles from './ClientFilter.module.less';

const { Option } = Select;

type ClientFilterProps = {
  value?: string;
  onChange?: (value: SelectValue) => void;
  placeholder?: string;
  options?: ConfigureClientFilter[];
};

const ClientFilter: React.FC<ClientFilterProps> = ({ onChange, placeholder, options }) => {
  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Select
      className={styles.tree_select_wrapper}
      placeholder={placeholder}
      onChange={onChange}
      allowClear
      showSearch
      filterOption={onSearchFilter}
    >
      {options &&
        options.map(
          (option: ConfigureClientFilter, i: number): React.ReactNode => {
            return (
              <Option value={option.name} key={`client-option-${option.name}-${i}`}>
                {option.name}
              </Option>
            );
          }
        )}
    </Select>
  );
};

export default ClientFilter;
