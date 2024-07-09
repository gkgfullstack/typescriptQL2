import React, { useState } from 'react';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
//import { Select } from 'antd';
//import styles from './SitesFilter.module.less';
import { useCustomFilterMatches } from '../hooks';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
//import { SelectValue } from 'antd/lib/select';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import MultiSelectionList from 'src/components/common/MultiSelectionList';
import { useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';
//const { Option } = Select;

export type FilterOption = {
  label: string;
  value: string;
};

export type MatchedProductsFilterProps = {
  onOptionsSelected: Function;
  defaultOptions?: Array<CheckboxValueType>;
  options: FilterOption[];
  header?: string;
  searchPlaceholder?: string;
  keyName: string;
  sortingSelected?: boolean;
  withSearch?: boolean;
  customFilter?: boolean;
};

const SitesFilter: React.FC<MatchedProductsFilterProps> = ({
  onOptionsSelected,
  defaultOptions,
  options,
  //header = 'Filter',
  keyName,
  sortingSelected = true,
  withSearch = true,
  //searchPlaceholder = '',
  customFilter,
}: MatchedProductsFilterProps): JSX.Element => {
  const sourceOwnerId = useSourceOwnerId(); 
  const {productId}:any = useProductDetailsStateContext();
  const { data, loading, error } = useCustomFilterMatches(sourceOwnerId, productId);
  //const setQuery = useQueryUrlParamsDispatch();
  // const [value, setValue] = useState<Array<SelectValue>>(defaultValue);
  // useEffect(() => {
  //   if (JSON.stringify(defaultValue) !== JSON.stringify(value)) {
  //     setValue(defaultValue);
  //   }
  // }, [defaultValue, value]);
  const responseLoaded = !loading && (data || error);
  console.log(responseLoaded)
  const [optionsArr, setFilteredOptions] = useState<FilterOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<CheckboxValueType[]>([]);
  const [initialOptions, setInitialOptions] = useState<FilterOption[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [checkBoxValues, setCheckBoxValues] = useState(defaultOptions);
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();

  const sortArrByCheckValue = (currArr: Array<CheckboxValueType>, initArray: FilterOption[]): FilterOption[] => {
    if (currArr.length > 0) {
      const getSelectedOptions = initArray.filter(option => currArr.includes(option.value));
      const cleanupOptions = initArray.filter(option => !currArr.includes(option.value));
      return [...getSelectedOptions, ...cleanupOptions];
    }
    return initArray;
  };
  React.useEffect(() => {
    if (options) {
      if (searchValue) {
        return;
      } else if (defaultOptions && defaultOptions.length > 0 && sortingSelected) {
        const sortedOptions = sortArrByCheckValue(defaultOptions, options);
        setFilteredOptions(sortedOptions);
        setInitialOptions(sortedOptions);
        setSelectedOptions(defaultOptions);
      } else {
        setFilteredOptions(options);
        setInitialOptions(options);
      }
    }
    if(customFilter){

    }
  }, [options, defaultOptions, sortingSelected, searchValue, customFilter]);
  const handleSearch = (value: string): void => {
    if (!value) {
      setSearchValue(value);
      setFilteredOptions(initialOptions);
      return;
    }
    const filteredOptions = initialOptions.filter(option => {
      const searchValue = value.toLowerCase();
      const optionLabel = option.label.toLowerCase();
      return optionLabel.indexOf(searchValue) !== -1;
    });
    setSearchValue(value);
    setFilteredOptions(filteredOptions);
  };
  const handleChange = (value: Array<CheckboxValueType>): void => {
    let currSelectedOptions = [] as Array<CheckboxValueType>;
    if (defaultOptions && defaultOptions.length > 0) {
      currSelectedOptions = [...selectedOptions] as Array<CheckboxValueType>;
      
    }
    setQuery({
      [keyName]: currSelectedOptions,
    } as ProductFinderQueryParams);
    onOptionsSelected(keyName, currSelectedOptions);
    setSelectedOptions(currSelectedOptions);
    setCheckBoxValues(value);
    if (searchValue) {
      setFilteredOptions(optionsArr);
    } else {
      const options = sortingSelected ? sortArrByCheckValue(value, initialOptions) : initialOptions;
      setInitialOptions(options);
      setFilteredOptions(options);
    }
  };
  
  return (<>{
    responseLoaded && options && (withSearch ? (<MultiSelectionList
      data={optionsArr}
      //placeholder={searchPlaceholder}
      value={checkBoxValues}
      defaultValue={defaultOptions}
      onChange={handleChange}
      onSearch={handleSearch}
    />) : (<Checkbox.Group
            options={optionsArr}
            value={checkBoxValues}
            defaultValue={defaultOptions}
            onChange={handleChange}
          />))}
    
  </>);
};
export default SitesFilter;
