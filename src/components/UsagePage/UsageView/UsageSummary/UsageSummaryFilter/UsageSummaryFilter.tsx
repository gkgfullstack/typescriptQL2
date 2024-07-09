import React from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

type UsageSummaryFilterProps = {
  onUpdate: (value: string) => void;
};

const UsageSummaryFilter: React.FC<UsageSummaryFilterProps> = ({ onUpdate }) => {
  const filterOptions: any = [
    {
      name: 'Daily',
      id: 'daily',
    },
    {
      name: 'Monthly',
      id: 'monthly',
    },
    {
      name: 'Yearly',
      id: 'yearly',
    },
  ];

  const onFilterChange = (value: SelectValue) => {
    const newValue: string = value ? value.toString() : '';
    onUpdate(newValue);
  };

  return (
    <Select placeholder="Select" defaultValue="Daily" onChange={onFilterChange} allowClear>
      {filterOptions &&
        filterOptions.map(
          (option: any, i: number): React.ReactNode => {
            return (
              <Option value={option.id} key={`filter-${option.name}-${i}`}>
                {option.name}
              </Option>
            );
          }
        )}
    </Select>
  );
};

export default UsageSummaryFilter;
