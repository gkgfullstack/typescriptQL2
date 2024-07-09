import React from 'react';
import Accordion from 'src/components/common/Accordion';
import RadioGroupList from 'src/components/common/RadioGroupList';
//import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import styles from './PriceTypeFilter.module.less';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

const DEFAULT_OPTIONS = [
  { label: 'Regular Price', value: '1' },
  { label: 'Lowest Price', value: '2' },
];

type SortByFilterProps = {
  onSelect?: Function;
  defaultOptions?: CheckboxOptionType[];
  header?: string;
  defaultValue?:string;
};

const PriceTypeFilter: React.FC<SortByFilterProps> = ({
  //onSelect,
  defaultOptions = DEFAULT_OPTIONS,
  header = 'Price Type',
}: SortByFilterProps) => {
  const setSelectedItemss = useQueryUrlParamsDispatch();
  let  { priceType } = useQueryUrlParams(); 

  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1"; 
  //const { sortingcolumn, sortingorder } = useQueryUrlParams();
  let defaultValue = initialPriceTypeIds;
  let key = DEFAULT_OPTIONS.map(types => (types.value))
  //const [sortValue, setSortValue] = useState<CheckboxValueType>(defaultValue);
  const [selectedItems, setSelectedItems] = React.useState<CheckboxValueType>(defaultValue);
   const onSelectSortBy = (value: string): void => {
    setSelectedItemss({ priceType: value})
    setSelectedItems(value);
  };
  return (
    <Accordion header={header}>
      <div className={styles.sort_by_wrapper}>
        <RadioGroupList onChange={onSelectSortBy} key={key+`${key}`} options={defaultOptions} value={selectedItems}/>
      </div>
    </Accordion>
  );
};
export default PriceTypeFilter;
