import React, { useCallback, useState } from 'react';
import OptionsDropdown from './OptionsDropdown/OptionsDropdown';
import useCategoriesFetching from './hooks/useCategoriesFetching';
import { Option } from './OptionsDropdown/reducers/optionsDropdownReducer';

export type ProductCategoryProps = {
  value?: string[];
  sourceOwnerId: string;
  onChange: (values: string[]) => void;
};

export type CategoryOptions = {
  sourceOwnerId: string;
  selectedOptions: Option[];
};

const initialState: CategoryOptions = {
  selectedOptions: [],
  sourceOwnerId: '',
};

const ProductCategory: React.FC<ProductCategoryProps> = ({ value, sourceOwnerId, onChange }: ProductCategoryProps) => {
  const [options, setOptions] = useState<CategoryOptions>(initialState);
  const [{ data, error }] = useCategoriesFetching(options);

  React.useEffect(() => {
    if (sourceOwnerId && options.sourceOwnerId !== sourceOwnerId) {
      setOptions({ sourceOwnerId: sourceOwnerId, selectedOptions: [] });
    }
  }, [sourceOwnerId, options]);

  const loadData = useCallback(
    (selectedOptions: Option[]) => {
      if (JSON.stringify(options.selectedOptions) !== JSON.stringify(selectedOptions)) {
        setOptions({ ...options, selectedOptions: selectedOptions });
      }
    },
    [options]
  );

  return (
    <OptionsDropdown
      value={value}
      error={error}
      options={data}
      loadData={loadData}
      placeholder={'Categories'}
      onChange={onChange}
    />
  );
};

export default ProductCategory;
