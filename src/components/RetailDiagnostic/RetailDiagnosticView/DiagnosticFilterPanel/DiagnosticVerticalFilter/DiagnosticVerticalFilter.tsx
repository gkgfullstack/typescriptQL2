import React, { ReactElement } from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetMWSSchemas } from 'src/api/MWSSchemasFilter';

const { Option } = Select;

type DiagnosticVerticalFilterProps = {
  setParams: (name: string, value: string) => void;
  loading?: boolean;
};

const DiagnosticVerticalFilter: React.FC<DiagnosticVerticalFilterProps> = ({ setParams, loading }) => {
  const [schemasOptions] = useGetMWSSchemas();

  const onCategoryChange = (value: SelectValue) => {
    const newSchema: string = value && Array.isArray(value) && value.length > 0 ? value.toString() : 'all';
    setParams('schema', newSchema);
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Select
      mode="multiple"
      showArrow={true}
      placeholder="Select Vertical"
      onChange={onCategoryChange}
      allowClear
      showSearch
      filterOption={onSearchFilter}
      loading={loading}
      dropdownStyle={loading ? { display: 'none' } : {}}
      maxTagCount={1}
    >
      {schemasOptions &&
        schemasOptions.map(
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

export default DiagnosticVerticalFilter;
