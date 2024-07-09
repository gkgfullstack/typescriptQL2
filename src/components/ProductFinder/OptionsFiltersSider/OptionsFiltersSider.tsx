import React from 'react';
import styles from './OptionsFiltersSider.module.less';
import clsx from 'clsx';
//import Spin from 'src/components/common/Spin';
//import { Alert } from 'antd';
// import { useSearchProductsDispatchContext } from 'src/stateProviders/useSearchProductsStateContext';
// import { SEARCH_PRODUCTS_ACTION_TYPES, Filters } from 'src/stateProviders/searchProductsStateProvider';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import PriceTypeFilter from './PriceTypeFilter';
import MatchTypeFilter from './MatchTypeFilter';
//import { useOptionsFiltersFetching } from './hooks';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import RegionFilter from './RegionFilter/RegionFilter';
import ProductFinderQueryParams from 'src/types/ProductFinderQueryParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
// import { useProductDetailsDispatchContext } from 'src/stateProviders/useProductDetailsStateContext';
// import { PRODUCT_DETAILS_ACTION_TYPES, ProductDetailsState } from 'src/stateProviders/productDetailsStateProvider';

type AdvancedFilterSiderProps = {
  //active?:any;
  onToggleCollapse?:any;
  //params?:any;
  className?:any;
  collapsedOptions?:any;
  //schema?:any; 
  //site?:any; 
  //setParams?:any;
  selectedItems?:any;
};
const OptionsFiltersSider: React.FC<AdvancedFilterSiderProps> = ({
  //customFilter = true,
  //params,
  collapsedOptions,
  //site,
  //schema,
  selectedItems
  //setParams,
  }) => {
  const sourceOwnerId = useSourceOwnerId();
  const { matchTypeFilter, region, priceType} = useQueryUrlParams();
  const setQuery = useQueryUrlParamsDispatch<ProductFinderQueryParams>();
  //const { matchTypeFilter, region, pricetype } = useQueryUrlParams();
  const selectedRegion = region && ((region) ? region : [region]);
  const selectedPricetype = priceType && ((priceType) ? priceType : [priceType]);
  const selectedMatchTypeFilter = matchTypeFilter && ((matchTypeFilter) ? matchTypeFilter : [matchTypeFilter]);
  
  const handleFiltersUpdate = (key: string, value: any) => {
    setQuery(
      {
        [key]: value,
        category: [],  
      })     
  };
  

  return (
    <div className={clsx(styles.filter_sider_container, { [styles.collapsedOptions]: collapsedOptions })}>    
       <div className={styles.filters_wrapper} id="widget">
        
            <div className={styles.filter_panel_dropdown}>
              <RegionFilter 
              sourceOwnerId={sourceOwnerId} 
              selectedItems={selectedItems}
              onChange={handleFiltersUpdate}
              //options={selectedInsightProduct}              
              selectedSites={selectedRegion}
              defaultValue={selectedRegion}
             // key={sourceOwnerId+1}
              />
            </div>
              <PriceTypeFilter 
              onSelect={handleFiltersUpdate} 
              defaultValue={selectedPricetype}
              //key={selectedPricetype+1}
              />            
              <MatchTypeFilter 
              onSelect={handleFiltersUpdate} 
              defaultValue={selectedMatchTypeFilter}
             // key={selectedMatchTypeFilter+1}
              />
           
      </div>
    </div>
  );
};

export default OptionsFiltersSider;
