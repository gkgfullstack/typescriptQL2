import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import styles from './SearchPanel.module.less';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';
import ProductCategory from 'src/components/common/ProductCategory';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import OwnersSelection from './OwnersSelection/OwnersSelection';
import { SelectValue } from 'antd/lib/select';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';

type SearchPanelProps = {
  pathname?: string;
  ownerPathname?: string;
  sourceOwnerId?: string | null;
};

const SearchPanel: React.FC<SearchPanelProps> = ({
  pathname,
  ownerPathname,
  sourceOwnerId: sourceOwnerIdProp,
}: SearchPanelProps) => {
  const ownerId = useSourceOwnerId();
  const { search = '', category } = useQueryUrlParams<ProductFinderQueryParams>();
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  const ownerValue = sourceOwnerIdProp || ownerId;
  const categoryUrlParam = category ? (Array.isArray(category) ? category : [category]) : [];
  const [categoryValue, setCategoryValue] = useState<string[] | undefined>(categoryUrlParam);
  
  useEffect(() => {
    if (JSON.stringify(categoryUrlParam) !== JSON.stringify(categoryValue)) {
      setCategoryValue(categoryUrlParam);
    }
  }, [categoryUrlParam, categoryValue]);
  
  const handleOwnerChange = (value: SelectValue) => {
	  // remove
	localStorage.removeItem('sourceOwnerId');
	  const sourceOwnerIds=value.toString();
  localStorage.setItem('sourceOwnerId', sourceOwnerIds);
  localStorage.setItem('activeIds', `true`);
    setQuery(
      {
        sourceOwnerId: value.toString(),
        category: [],  
      },
      ownerPathname || pathname,
      true
    );
  };
  const handleSearchChange = (value: string): void => {
    setQuery(
      {
        sourceOwnerId: ownerValue,
        search: value,
      },
      pathname
    );
  };
  const handleCategoryChange = (values: string[]) => {
	localStorage.removeItem('category');
	const categoryName=values.toString();
	localStorage.setItem('category', categoryName);
    setQuery(
      {
        sourceOwnerId: ownerValue,
        category: values || [],
      },
      pathname
    );
  };
  return (
    <div className={styles.search_panel_wrapper}>
      <div className={styles.search_panel_owner}>
        <OwnersSelection value={ownerValue} onChange={handleOwnerChange} />
      </div>
      <div className={styles.search_panel_category}>
        <ProductCategory value={categoryValue} sourceOwnerId={ownerValue} onChange={handleCategoryChange} />
      </div>
      <div className={styles.search_panel_input}>
        <SearchBar onChangeSearch={handleSearchChange} value={search} />
      </div>
     </div>
  );
};

export default SearchPanel;
