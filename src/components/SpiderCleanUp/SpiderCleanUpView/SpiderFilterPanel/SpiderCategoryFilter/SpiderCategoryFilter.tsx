import React from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

const categoryOptions: any = [
  {
    name: 'New',
    id: 'new',
  },
  {
    name: 'Removed',
    id: 'deleted',
  },
  {
    name: 'Show All',
    id: '',
  },
];

type SpiderCategoryFilterProps = {
  setParams: (name: string, value: string) => void;
};

const SpiderCategoryFilter: React.FC<SpiderCategoryFilterProps> = ({ setParams }) => {
  const onCategoryChange = (value: SelectValue) => {
    const newCategory: string = value ? value.toString() : '';
    setParams('category', newCategory);
  };

  return (
    <Select placeholder="Select Status" defaultValue={['']} onChange={onCategoryChange} allowClear>
      {categoryOptions.map(
        (option: any, i: number): React.ReactNode => {
          return (
            <Option value={option.id} key={`category-${option.name}-${i}`}>
              {option.name}
            </Option>
          );
        }
      )}
    </Select>
  );
};

export default SpiderCategoryFilter;
