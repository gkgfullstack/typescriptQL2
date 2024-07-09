import React, { useState } from 'react';
//import { Button } from 'antd';
import styles from './AdvancedFilterSider.module.less';
import clsx from 'clsx';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';
import { useSearchProductsDispatchContext } from 'src/stateProviders/useSearchProductsStateContext';
import { SEARCH_PRODUCTS_ACTION_TYPES, Filters } from 'src/stateProviders/searchProductsStateProvider';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
//import SortByFilter from './SortByFilter';
import MatchedProductsFilter from './MatchedProductsFilter';
import { useAdvancedFiltersFetching } from './hooks';
import FilterWithMultiSelection from './FilterWithMultiSelection';
import { FilterOption } from './FilterWithMultiSelection/FilterWithMultiSelection';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import ActiveFilter from './ActiveFilter';
import NoMatchFilter from './NoMatchFilter';
import InsightsOnlyFilter from './InsightsOnlyFilter';
import { CustomFilterCategories } from "src/types/CustomFilterType";

type AdvancedFilterSiderProps = {
  active?:any;
  onToggleCollapse?:any;
  customFilter?:any;
  className?:any;
  collapsed?:any;
};

const transformToFilterOptions = (elem: any): FilterOption => ({
  label: elem.label.toLocaleUpperCase(),
  value: elem.Id.toString().toLowerCase(),
});

const AdvancedFilterSider: React.FC<AdvancedFilterSiderProps> = ({
  customFilter = true,
  collapsed,
}) => {
  const sourceOwnerId = useSourceOwnerId();
  let  { region, matchTypeFilter, priceType } = useQueryUrlParams(); 
  let initialMatchTypeFilter:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegion:string = region  !== undefined ? region :"-1";
  let initialPriceType:string = priceType  !== undefined ? priceType :"1";
  const searchQueryDispatch = useSearchProductsDispatchContext();
  const { data, loading, error } = useAdvancedFiltersFetching(sourceOwnerId, initialMatchTypeFilter, initialRegion, initialPriceType);  
  const initialBrands = (data && (data.manufacturer || []).map(transformToFilterOptions)) || [];
  const initialSites = (data && (data.owners || []).map(transformToFilterOptions)) || [];
  const initialPriceVariance = data
    ? (data.variance || []).map(type => ({ label: type.label, value: type.Id.toString() })) : [];
  const initialMatches = data
    ? (data.noOfMatches || []).map(match => ({ label: match.label, value: match.Id.toString() })) : [];
  let initialCustomLabel = data ? (data.customFilterList || []).map(type => ({Id: type.Id, filterLabel: type.filterLabel, filterValues: type.filterValues })) : [];
  
  const { brands, pricev, matches, sites, active, noMatch, insight, ...customFilterList} = useQueryUrlParams();
  const selectedBrands = brands && (Array.isArray(brands) ? brands : [brands]);
  const selectedSites = sites && (Array.isArray(sites) ? sites : [sites]);

  const selectedPriceVariance = pricev && (Array.isArray(pricev) ? pricev : [pricev]);  
  const matchesProductsArr = matches && (Array.isArray(matches) ? matches : [matches]);
  const responseLoaded = !loading && (data || error);
  const selectedActiveProduct = active && ((active) ? active : [active]);
  const selectedInsightProduct = insight && ((insight) ? insight : [insight]);  
  const selectedNoMatchProduct = noMatch && ((noMatch) ? noMatch : [noMatch]);
  let [disabledval, setDisabledVal] = useState((!active) ? false : true);
  let [, setCustomFilter] = useState(!customFilter);
  
  const handleFiltersUpdate = (key: string, value: any): void => {
    searchQueryDispatch({
      type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchFilters,
      payload: { [key]: value } as Filters,
    });
    if(key === "active" && value){
      setDisabledVal(true);
    }else if(key === "active" && !value){
      setDisabledVal(false);
    }
    if(customFilter && value){
      setCustomFilter(false)
    }else{
      setCustomFilter(true)
    }
  };
  React.useEffect(() =>{ 
    if(!active === true){
      setDisabledVal(false);
    } else{
      setDisabledVal(true);
    }
          
  }, [active])


  const getDefaultOptions = (types: CustomFilterCategories) => {
    return customFilterList ? Array.isArray(customFilterList[types.filterLabel]) ?
        customFilterList[types.filterLabel] : [customFilterList[types.filterLabel]] : [];
  };
  
  return (
    <div className={clsx(styles.filter_sider_container, { [styles.collapsed]: collapsed })}>      
      <div className={styles.filters_wrapper} id="widget">
        {loading && (
          <div className={styles.filters_spinner}>
            <Spin spinning={loading} />
          </div>
        )}
        {responseLoaded &&
          (error ? (
            <div className={styles.filters_error}>
              <Alert
                message="An error has occurred when trying to get filter list! Please try again later!"
                type="error"
                showIcon
              />
            </div>
          ) : (<>
              {data && (data.active ? ( 
              <div className={styles.activeInactive}>
               <ActiveFilter 
              options={selectedActiveProduct}
              defaultChecked={selectedActiveProduct}
              onChange={handleFiltersUpdate}
              /></div>) : <div></div>)}
              <div className={styles.activeInactive}>
              <NoMatchFilter 
              options={selectedNoMatchProduct}
              defaultChecked={selectedNoMatchProduct}
              onChange={handleFiltersUpdate}
              disabled ={disabledval}
              /></div>
              <div className={styles.activeInactive}>
              <InsightsOnlyFilter 
              options={selectedInsightProduct}
              defaultChecked={selectedInsightProduct}
              onChange={handleFiltersUpdate}
              /></div>         
              {/* <SortByFilter onSelect={handleFiltersUpdate} /> */}
              <FilterWithMultiSelection
                header={'Price Variance'}
                defaultOptions={selectedPriceVariance}
                options={initialPriceVariance}
                onOptionsSelected={handleFiltersUpdate}
                keyName="pricev"
                withSearch={false}
                sortingSelected={false}
                back={false}
              />
              <MatchedProductsFilter
                options={initialMatches}
                defaultValue={matchesProductsArr}
                onChange={handleFiltersUpdate}
              />
              <FilterWithMultiSelection
                header={'Manufacturer'}
                defaultOptions={selectedBrands}
                options={initialBrands}
                searchPlaceholder={'Search'}
                onOptionsSelected={handleFiltersUpdate}
                keyName="brands"
                back={false}
              />
              <FilterWithMultiSelection
                header={'Site'}
                searchPlaceholder={'Search'}
                defaultOptions={selectedSites}
                options={initialSites}
                onOptionsSelected={handleFiltersUpdate}
                keyName="sites"
                back={false}
              />
              
              {initialCustomLabel.map((types, i) =>(
              <FilterWithMultiSelection
                header={types.filterLabel}
                searchPlaceholder={'Search'}
                defaultOptions={getDefaultOptions(types)}
                options={types.filterValues}
                onOptionsSelected={handleFiltersUpdate}
                keyName={types.Id}
                customFilter={customFilter}
                key={`FilterWithMultiSelection-${i}`}
                back={false}
              />))}
            </>
          ))}
      </div>
    </div>
  );
};

export default AdvancedFilterSider;
