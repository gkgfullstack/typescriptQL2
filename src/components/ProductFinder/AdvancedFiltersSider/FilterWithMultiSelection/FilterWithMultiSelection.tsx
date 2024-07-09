import React, { useState } from 'react';
import MultiSelectionList from 'src/components/common/MultiSelectionList';
import Accordion from 'src/components/common/Accordion';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterWithMultiSelectionProps = {
  onOptionsSelected: Function;
  defaultOptions?: Array<CheckboxValueType>;
  options: FilterOption[];
  header?: string;
  searchPlaceholder?: string;
  keyName: string;
  sortingSelected?: boolean;
  withSearch?: boolean;
  customFilter?: boolean;
  back:boolean
};

const FilterWithMultiSelection: React.FC<FilterWithMultiSelectionProps> = ({
  onOptionsSelected,
  defaultOptions,
  options,
  header = 'Filter',
  keyName,
  sortingSelected = true,
  withSearch = true,
  searchPlaceholder = '',
  customFilter,
  back=false,
}: FilterWithMultiSelectionProps): JSX.Element => {
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
    if(back === true){
      //setQuery({back:false})
      localStorage.removeItem('URL')
      localStorage.removeItem('pageVal')
    }
  }, [options, defaultOptions, sortingSelected, searchValue, customFilter, back]);

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
      if (value.some(option => !selectedOptions.includes(option))) {
        const newOptions: CheckboxValueType[] = value.filter(option => !selectedOptions.includes(option));
        currSelectedOptions = [...currSelectedOptions, ...newOptions];
      } else {
        const removedOptions = optionsArr
          .reduce((acc: CheckboxValueType[], currElem) => {
            if (selectedOptions.find(option => option === currElem.value)) {
              acc.push(currElem.value);
            }
            return acc;
          }, [])
          .filter(option => !value.find(currOption => currOption === option));

        currSelectedOptions = selectedOptions.filter(elem => !removedOptions.find(item => item === elem));
      }
    } else {
      currSelectedOptions = [...value];
    }
    setQuery({
      [keyName]: currSelectedOptions,
      back:false
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
  return (
    <Accordion header={header}>
      {options &&
        (withSearch ? (
          <MultiSelectionList
            data={optionsArr}
            placeholder={searchPlaceholder}
            value={checkBoxValues}
            defaultValue={defaultOptions}
            onChange={handleChange}
            onSearch={handleSearch}
          />
        ) : (
          <Checkbox.Group
            options={optionsArr}
            value={checkBoxValues}
            defaultValue={defaultOptions}
            onChange={handleChange}
          />
        ))}
    </Accordion>
  );
};
export default FilterWithMultiSelection;
