import React, { ReactElement, useEffect, useState } from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetMWSSchemas } from 'src/api/MWSSchemasFilter';

const { Option } = Select;

type ProductVerticalFilterProps = {
  setParams: (name: string, value: string) => void;
};

const ProductVerticalFilter: React.FC<ProductVerticalFilterProps> = ({ setParams }) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const schemaName = urlParams.get('schema')?.toString();
  const [initialState, setInitialState] = useState<any>(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [schemasOptions] = useGetMWSSchemas();

  useEffect(() => {
    if (schemasOptions.length > 0 && schemaName && !initialState) {
      setSelectedItems(schemaName);
      setInitialState(true);
      setParams('schema', schemaName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemaName, schemasOptions]);

  const onSchemaChange = (value: SelectValue) => {
    const newSchema: string = value ? value.toString() : '';
    setSelectedItems(value);
    setParams('schema', newSchema);
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Select
      placeholder="Select Vertical"
      onChange={onSchemaChange}
      allowClear
      showSearch
      value={selectedItems}
      filterOption={onSearchFilter}
    >
      {schemasOptions &&
        schemasOptions.map(
          (option: any, i: number): React.ReactNode => {
            return (
              <Option value={option.name} key={`product-schema-${option.name}-${i}`}>
                {option.name}
              </Option>
            );
          }
        )}
    </Select>
  );
};

export default ProductVerticalFilter;
