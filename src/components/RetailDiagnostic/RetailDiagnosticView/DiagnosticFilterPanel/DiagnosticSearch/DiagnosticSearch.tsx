import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Input } from 'antd';
import styles from './DiagnosticSearch.module.less';

const DEFAULT_PLACEHOLDER = 'Enter Collection Group Name to refine your results';

type DiagnosticSearchProps = {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  loading?: boolean;
  search?: any;
  onChangeSearch: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
};

const DiagnosticSearch: React.FC<DiagnosticSearchProps> = ({
  placeholder = DEFAULT_PLACEHOLDER,
  defaultValue = '',
  value = '',
  loading = false,
  onChangeSearch,
}: DiagnosticSearchProps) => {
  const [currValue, setValue] = useState(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handlerSearchEvent = (e: SyntheticEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  return (
    <Input.Search
      className={styles.search_bar_input}
      defaultValue={defaultValue}
      loading={loading}
      value={currValue}
      placeholder={placeholder}
      onSearch={onChangeSearch}
      onChange={handlerSearchEvent}
      allowClear
    />
  );
};

export default DiagnosticSearch;
