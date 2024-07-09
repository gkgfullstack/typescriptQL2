import React, { ReactElement, useEffect, useState } from 'react';
import { Select } from 'antd';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

type UsageFilterProps = {
  name: string;
  options: any;
  onUpdate: (name: string, value: string) => void;
  isReset?: boolean;
};

const UsageFilter: React.FC<UsageFilterProps> = ({ name, options = [], onUpdate, isReset }) => {
  const [initialState, setInitialState] = useState<number>(0);
  const [filterValue, setFilterValue] = useState<any>([]);
  const [search, setSearch] = useState<string>('');

  const onFilterChange = (value: SelectValue) => {
    const newValue: string = value ? value.toString() : '';
    setFilterValue(value);
    onUpdate(name, newValue);
  };

  useEffect(() => {
    const selection = options.map((option: any) => option.id);
    if (options.length > 0 && initialState !== options.length) {
      setInitialState(options.length);
      onFilterChange(selection);
    }
    if (options.length > 0 && isReset) {
      onFilterChange(selection);
    }

    if (options.length === 0) {
      setFilterValue([]);
      setInitialState(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, isReset]);

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const onSearchValue = (input: any) => {
    if (options.length > 150) {
      setSearch(input);
    }
  };

  return (
    <div>
      <p style={{ fontSize: '12px', marginBottom: '3px' }}>{name}</p>
      {search}
      <Select
        placeholder={`Select ${name}`}
        onChange={onFilterChange}
        value={filterValue}
        showArrow={true}
        mode={'multiple'}
        allowClear
        showSearch
        filterOption={onSearchFilter}
        maxTagCount={1}
        maxTagTextLength={15}
        onSearch={onSearchValue}
      >
        {options &&
          options
            .filter((item: any) => {
              if (search.trim() !== '') {
                return item.name.toLowerCase().indexOf(search!.toLowerCase()) > -1;
              }
              return true;
            })
            .filter((_: any, i: number) => {
              return i < 150;
            })
            .map(
              (option: any, i: number): React.ReactNode => {
                return (
                  <Option value={option.id} key={`filter-${name}-${option.name}-${i}`}>
                    {option.name}
                  </Option>
                );
              }
            )}
        {options && options.length > 150 && <Option key={`filter-search`}>First 150 jobs. Search to see more</Option>}
      </Select>
    </div>
  );
};

export default UsageFilter;
