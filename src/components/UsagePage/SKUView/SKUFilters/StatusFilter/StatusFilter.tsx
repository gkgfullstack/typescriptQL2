import React, { ReactElement } from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

type StatusFilterProps = {
  setParams: (name: string, value: string) => void;
};

const statusOptions: any = [
  {
    id: '1',
    name: 'Active',
  },
  {
    id: '1',
    name: 'Inactive',
  },
];

const StatusFilter: React.FC<StatusFilterProps> = ({ setParams }) => {
  const onCategoryChange = (value: SelectValue) => {
    const newSchema: string = value
      ? value.toString().indexOf(',') > -1
        ? ''
        : value.toString() === 'Active'
        ? '1'
        : '0'
      : '';
    setParams('status', newSchema);
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Select
      placeholder="Select Status"
      onChange={onCategoryChange}
      allowClear
      showSearch
      filterOption={onSearchFilter}
      mode={'multiple'}
      maxTagCount={1}
      showArrow={true}
      defaultValue={['Active', 'Inactive']}
    >
      {statusOptions &&
        statusOptions.map(
          (option: any, i: number): React.ReactNode => {
            return (
              <Option value={option.name} key={`category-${option.name}-${i}`}>
                {option.name}
              </Option>
            );
          }
        )}
    </Select>
  );
};

export default StatusFilter;
