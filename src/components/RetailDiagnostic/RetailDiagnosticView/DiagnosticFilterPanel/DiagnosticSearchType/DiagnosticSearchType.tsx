import React from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;
const searchOptions: any[] = [
  {
    name: 'CRAWL',
    id: 'crawl',
  },
  {
    name: 'DIRECT',
    id: 'direct',
  },
  {
    name: 'FEED',
    id: 'feed',
  },
  {
    name: 'SHALLOW',
    id: 'shallow',
  },
  {
    name: 'SPIDER',
    id: 'spider',
  },
];

type DiagnosticSearchTypeProps = {
  setParams: (name: string, value: string) => void;
  loading?: boolean;
};

const DiagnosticSearchType: React.FC<DiagnosticSearchTypeProps> = ({ setParams, loading }) => {
  const onSearchChange = (value: SelectValue) => {
    const newSearchType: string = value ? value.toString() : '';
    setParams('searchType', newSearchType);
  };

  return (
    <Select
      placeholder="Select Search Type"
      onChange={onSearchChange}
      allowClear
      loading={loading}
      dropdownStyle={loading ? { display: 'none' } : {}}
    >
      {searchOptions &&
        searchOptions.map(
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

export default DiagnosticSearchType;
