import React, { ReactElement, useEffect, useState } from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

const onSearchFilter = (input: string, option: ReactElement) => {
  const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
  return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const getSelectionClass = (filterValue: any) => {
  if (filterValue.length > 0) {
    return '';
  }
  return 'filter_not_selected';
};

type AuditHistoryFilterProps = {
  id: string;
  label: string;
  options?: any[];
  onUpdate: (id: string, value: string) => void;
  selection?: string;
};

const AuditHistoryFilter: React.FC<AuditHistoryFilterProps> = ({ label, id, options = [], onUpdate, selection }) => {
  const [initialState, setInitialState] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<any>([]);

  const onFilterChange = (value: SelectValue) => {
    const newValue: string = value ? value.toString() : '';
    setFilterValue(value);
    onUpdate(id, newValue);
  };

  useEffect(() => {
    const selectedOptions = options
      .filter(item => (selection ? selection === item.id : true))
      .map((option: any) => option.id);
    if (options.length > 0 && !initialState) {
      setInitialState(true);
      onFilterChange(selectedOptions);
    }
    if (options.length === 0) {
      setFilterValue([]);
      setInitialState(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <div>
      <p style={{ fontSize: '12px', marginBottom: '3px' }}>{`${label}`}</p>
      <Select
        placeholder={`Select ${label}`}
        onChange={onFilterChange}
        value={filterValue}
        showArrow={true}
        mode={'multiple'}
        allowClear
        showSearch
        filterOption={onSearchFilter}
        maxTagCount={1}
        className={getSelectionClass(filterValue)}
      >
        {options &&
          options.map(
            (option: any, i: number): React.ReactNode => {
              return (
                <Option value={option.id} key={`filter-${id}-${option.name}-${i}`}>
                  {option.name}
                </Option>
              );
            }
          )}
      </Select>
    </div>
  );
};

export default AuditHistoryFilter;
