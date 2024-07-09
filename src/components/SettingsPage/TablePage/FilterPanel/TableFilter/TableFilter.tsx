import React, { ReactElement, useEffect } from 'react';
import TablePageFilter from 'src/types/TablePageFilter';
import Select from 'src/components/common/Select';
import { SelectValue } from 'antd/lib/select';
import styles from './TableFilter.module.less';
import { useHistory } from 'react-router';
import { useVarticalTableFilter } from 'src/api/varticalTableFilter';

const { Option } = Select;

type TableFilterProps = {
  appId: string;
  setParams: (name: string, ID: string) => void;
};

const TableFilter: React.FC<TableFilterProps> = ({ setParams, appId }) => {
  const [schemasOptions] = useVarticalTableFilter();
  const history = useHistory();

  useEffect(() => {
    history.push({ search: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCategoryChange = (value: SelectValue) => {
    const newSchema: string = value ? value.toString() : '-1';
    setParams('appId', newSchema);
    history.push({ search: newSchema ? `?appId=${newSchema}` : '-1' });
    
  };
  const onSearchFilter = (input: string, option: ReactElement) => {
    const text: string = option && option.props && option.props.children ? option.props.children.toString() : '';
    return text.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  return (
    <Select
    className={styles.tree_select_wrapper}
    placeholder="Select Vertical"
    value={appId !== "-1"? appId: undefined}
    onChange={onCategoryChange}
    allowClear
    showSearch
    filterOption={onSearchFilter}
    >
      {schemasOptions &&
        schemasOptions.map(
          (option: TablePageFilter, i: number): React.ReactNode => {
            return (
              <Option value={option.ID} key={`Table-option-${option.name}-${i}`}>
                {option.name}
              </Option>
            );
          }
        )}
    </Select>
  );
};

export default TableFilter;
