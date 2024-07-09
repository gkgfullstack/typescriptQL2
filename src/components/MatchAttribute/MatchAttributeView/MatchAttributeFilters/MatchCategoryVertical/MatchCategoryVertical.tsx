import React, { ReactElement, useEffect } from 'react';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import { useGetMWSSchemas } from 'src/api/MWSSchemasFilter';
import { useHistory } from 'react-router';

const { Option } = Select;

type MatchCategoryVerticalProps = {
  setParams: (name: string, value: string) => void;
};

const MatchCategoryVertical: React.FC<MatchCategoryVerticalProps> = ({ setParams }) => {
  const [schemasOptions] = useGetMWSSchemas();
  const history = useHistory();

  useEffect(() => {
    history.push({ search: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCategoryChange = (value: SelectValue) => {
    const newSchema: string = value ? value.toString() : '';
    setParams('schema', newSchema);
    history.push({ search: newSchema ? `?schema=${newSchema}` : '' });
  };

  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Select
      showArrow={true}
      mode={'multiple'}
      placeholder="Select Vertical"
      onChange={onCategoryChange}
      allowClear
      showSearch
      filterOption={onSearchFilter}
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

export default MatchCategoryVertical;
