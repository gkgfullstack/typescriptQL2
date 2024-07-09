import React from 'react';
import {  Select } from 'antd';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';
import { MATCH_TYPE } from 'src/enums';
const { Option } = Select;

const matchTypes: string[] = Object.keys(MATCH_TYPE);
export type FilterWithMultiSelectionProps = {
  onOptionsSelected: Function;
  defaultOptions?: Array<string>;
  options: keyof typeof MATCH_TYPE;
  searchPlaceholder?: string;
  keyName: string;
  sortingSelected?: boolean;
  withSearch?: boolean;
};

const SitesFilter: React.FC<FilterWithMultiSelectionProps> = ({
  onOptionsSelected,
  options,
  keyName,
  withSearch = true,
}: FilterWithMultiSelectionProps): JSX.Element => {
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  const handleChange = (value: MATCH_TYPE): void => {
    let currSelectedOptions = [] as Array<string>;    
    setQuery({
      [keyName]: value,
    } as ProductFinderQueryParams);
    onOptionsSelected(keyName, currSelectedOptions);
  };
  return (
    <>
      {options &&
        (withSearch ? (          
          <Select 
              //defaultValue={defaultOptions !== undefined ? 'EXACT' : defaultOptions}
              placeholder="Select Match Type" 
              style={{ width: '100%', 
              padding: '0px 5px' }} 
              onChange={handleChange}
              >
              {matchTypes.map(
                (type: string): React.ReactNode => {
                  return (
                    <Option value={type} key={`match_type_${type}`}>
                      {MATCH_TYPE[type as keyof typeof MATCH_TYPE]}
                    </Option>
                  );
                }
              )}
            </Select>
        ) : null)}
    </>
  );
};
export default SitesFilter;
