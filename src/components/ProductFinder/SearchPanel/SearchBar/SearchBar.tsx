import React, { useEffect, useState, SyntheticEvent } from 'react';
import { Input } from 'antd';
import styles from './SearchBar.module.less';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';

const DEFAULT_PLACEHOLDER = 'Add more keywords to refine your results';

type SearchBarProps = {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  loading?: boolean;
  onChangeSearch: (
    value: string,
    event?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = DEFAULT_PLACEHOLDER,
  defaultValue = '',
  value = '',
  loading = false,
  onChangeSearch,
}: SearchBarProps) => {
  const setQuery = useQueryUrlParamsDispatch();
  const [currValue, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const handlerSearchEvent = (e: SyntheticEvent<HTMLInputElement>): void => {
    const value = e.currentTarget.value;
    setValue(value);
    setQuery({back:false})
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

export default SearchBar;
