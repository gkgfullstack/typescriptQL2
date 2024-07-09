import React, { useState } from 'react';
import Accordion from 'src/components/common/Accordion';
import RadioGroupList from 'src/components/common/RadioGroupList';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import styles from './SortByFilter.module.less';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const DEFAULT_OPTIONS = [
  { label: 'Product Name: A to Z', value: 'name-ascend' },
  { label: 'Product Name: Z to A', value: 'name-descend' },
  { label: 'Price: Low to High', value: 'regularprice-ascend' },
  { label: 'Price: High to Low', value: 'regularprice-descend' },
];

type SortByFilterProps = {
  onSelect: Function;
  defaultOptions?: CheckboxOptionType[];
  header?: string;
};

const SortByFilter: React.FC<SortByFilterProps> = ({
  onSelect,
  defaultOptions = DEFAULT_OPTIONS,
  header = 'Sort By',
}: SortByFilterProps) => {
  const setQuery = useQueryUrlParamsDispatch();
  const { sortingcolumn, sortingorder } = useQueryUrlParams();
  const defaultValue = defaultOptions[0].value;
  const [sortValue, setSortValue] = useState<CheckboxValueType>(defaultValue);

  React.useEffect(() => {
    const optionValue = `${sortingcolumn}-${sortingorder}`;
    if (sortingcolumn && sortingorder && optionValue !== sortValue) {
      setSortValue(optionValue);
    } else if (!sortingcolumn && !sortingorder && sortValue !== defaultValue) {
      setSortValue(defaultValue);
    }
  }, [sortingcolumn, sortingorder, sortValue, defaultValue]);

  const onSelectSortBy = (value: string): void => {
    setSortValue(value);
    const arrValue = value.split('-');
    let getQuery;
    if (arrValue.length === 2) {
      getQuery = {
        sortingcolumn: arrValue[0],
        sortingorder: arrValue[1],
        back:false
      };
      setQuery(getQuery);
    }
    onSelect('sort', getQuery);
  };
  return (
    <Accordion header={header}>
      <div className={styles.sort_by_wrapper}>
        <RadioGroupList onChange={onSelectSortBy} value={sortValue} defaultValue={sortValue} options={defaultOptions} />
      </div>
    </Accordion>
  );
};
export default SortByFilter;
