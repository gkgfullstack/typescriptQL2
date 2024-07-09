import React, { useState, useEffect } from 'react';
import styles from './ProductList.module.less';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import { Sorting } from 'src/types/Sorting';
import ProductListTable from './ProductListTable/ProductListTable';
import { useProductListFetch } from '../hooks';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';
import { useSearchProductsStateContext } from 'src/stateProviders/useSearchProductsStateContext';
import clsx from 'clsx';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
//import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';

export type ProductListProps = {
  sorting: Sorting<ProductFinderInfo>;
  onSortingChange: (sorting: Sorting<ProductFinderInfo>) => void;
};
export type customFilterListval = {
  id: String;
  values: any[];
};

const transformToFilterOptions = (id: string,values:any[]): customFilterListval => ({
  id: id,
  values: values,
});
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_NUMBER = 1;

const getCustomFilterListIds = (customFilterList: any) => {
  if (!customFilterList) { return null; }

  const filterList = Object.keys(customFilterList).filter((item: string) => Array.isArray(customFilterList[item]));
  const filterLabels = Object.values(filterList);
  const filterValues = filterLabels.reduce((values: customFilterListval[], item: string): any => {
   
    values.push(transformToFilterOptions(item,customFilterList[item].slice(1)));
    return values;
  }, []);
  
  if (filterList.length === 0) { return null; }

  return {
    filterValues
  };
};

const ProductList: React.FC<ProductListProps> = ({
  sorting,
  onSortingChange,
}: ProductListProps): React.ReactElement => {
  let {
    search = '',
    category,
    brands,
    sortingcolumn = 'name',
    sortingorder = 'ascend',
    pricev,
    matches,
    sites,
    active=0,
    noMatch=0,
    insight=0,
    matchTypeFilter="ALL",
    region="-1",
    priceType="1",
    back=false,
    id = DEFAULT_PAGE_SIZE,
    ...customFilterList
  } = useQueryUrlParams();
  //const setQuery = useQueryUrlParamsDispatch();
 
  //let pagesizeBack = DEFAULT_PAGE_SIZE;  
  const [pageSize, setPageSize] = useState(id);
  //setQuery({id:pageSize});

 let pageVal= localStorage.getItem("pageVal")
 let pageValues:number = Number(pageVal !== '0' || undefined ? pageVal : 1)  
 let pageInt= back && pageValues !== 0 ? pageValues : PAGE_NUMBER;

 let [page, setPage] = useState(pageInt);
 
  //const setQuery = useQueryUrlParamsDispatch();
  const { advancedFilters } = useSearchProductsStateContext();
  const sourceOwnerId = useSourceOwnerId();
  const categoryId = category ? (Array.isArray(category) ? category[category.length - 1] : category) : '';
  const manufacturerIds = brands ? (Array.isArray(brands) ? brands : [brands]) : null;
  const priceVarianceIds = pricev ? (Array.isArray(pricev) ? pricev : [pricev]) : null;
  const matchesIds = matches ? (Array.isArray(matches) ? matches : [matches]) : null;
  const customFilterListIds = getCustomFilterListIds(customFilterList);
  let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";

  let activeIds:any = active ? (Array.isArray(active) ? active : 1) : 0; 
  if(localStorage.getItem('activeIds')==='true'){
    activeIds=0;
    localStorage.removeItem('activeIds');
  }
  const ownerIds = sites ? (Array.isArray(sites) ? sites : [sites]) : null;
  const noMatchIds:any = noMatch ? (Array.isArray(noMatch) ? noMatch : 1) : 0;
  const insightIds:any = insight ? (Array.isArray(insight) ? insight : 1) : 0;

  useEffect(() => {
    setPage(pageInt);
    //setQuery({pageNo:page });
  }, [search, category, brands, pricev, matches, sortingcolumn, sortingorder, pageSize, sites, active, noMatch, insight, initialMatchTypeFilterIds, initialRegionIds, initialPriceTypeIds]);
  
  const { data: products, loading: productsLoading, error: productsError, total: totalProducts } = useProductListFetch(
    sorting,
    page,
    pageSize,
    search,
    categoryId,
    JSON.stringify(manufacturerIds),
    JSON.stringify(priceVarianceIds),
    JSON.stringify(matchesIds),
    JSON.stringify(ownerIds),
    sourceOwnerId,
    activeIds,
    noMatchIds,
    insightIds,
    JSON.stringify(customFilterListIds),
    initialMatchTypeFilterIds,
    initialRegionIds,
    initialPriceTypeIds
    );
    const fetchLoading = productsLoading && products === null;
  const isOpen = advancedFilters && advancedFilters.isOpen;
  return (
    <div className={clsx(styles.product_list_container, { [styles.with_filters]: isOpen })}>
      {productsError && (
        <Alert
          message="Error"
          description="An error has occurred when trying to get product list! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {fetchLoading ? (
        <div className={styles.product_list_loader}>
          <Spin spinning={fetchLoading} />
        </div>
      ) : (
        products !== null && (
          <ProductListTable
            items={products || []}
            sorting={sorting}
            loading={productsLoading}
            pageSize={pageSize}
            page={page}
            total={totalProducts}
            onPageSizeChange={setPageSize}
            onPageChange={setPage}
            onSortingChange={onSortingChange}
          />
        )
      )}
    </div>
  );
};

export default ProductList;


