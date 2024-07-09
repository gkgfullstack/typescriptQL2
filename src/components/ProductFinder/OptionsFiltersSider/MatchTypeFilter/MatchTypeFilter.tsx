import React, { useState } from 'react';
import Accordion from 'src/components/common/Accordion';
import RadioGroupList from 'src/components/common/RadioGroupList';
//import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import styles from './MatchTypeFilter.module.less';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

const DEFAULT_OPTIONS = [
  { label: 'All Matches', value: 'ALL' },
  { label: 'Exact Matches', value: 'EXACT' },
  { label: 'Like Matches', value: 'LIKE' },
];

type SortByFilterProps = {
  onSelect: Function;
  defaultOptions?: CheckboxOptionType[];
  header?: string;
  defaultValue?:any;
};

const MatchTypeFilter: React.FC<SortByFilterProps> = ({
  //onSelect,
  defaultOptions = DEFAULT_OPTIONS,
  header = 'Match Type',
}: SortByFilterProps) => {
  const setSelectedItemss = useQueryUrlParamsDispatch();
  const { matchTypeFilter } = useQueryUrlParams();
  const defaultValue = defaultOptions[0].value;
  const keyss = defaultOptions.map(typess=>(typess.value));
  const [sortValue, setSortValue] = useState<CheckboxValueType>(defaultValue);

  React.useEffect(() => {
    const optionValue = `${matchTypeFilter}`;
    if (matchTypeFilter && optionValue !== sortValue) {
      setSortValue(optionValue);
    } else if (!matchTypeFilter && sortValue !== defaultValue) {
      setSortValue(defaultValue);
    }
  }, [matchTypeFilter, sortValue, defaultValue]);

  const onSelectSortBy = (value: string) => {
    setSelectedItemss({matchTypeFilter: value})
    setSortValue(value)
  };
  return (
    <Accordion header={header}>
      <div className={styles.sort_by_wrapper}>
        <RadioGroupList onChange={onSelectSortBy} key={keyss+`${keyss}`} value={sortValue} defaultValue={sortValue} options={defaultOptions} />
      </div>
    </Accordion>
  );
};
export default MatchTypeFilter;
