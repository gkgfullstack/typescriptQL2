import { useEffect, useReducer } from 'react';
import ProductId from 'src/types/ProductFinder';
import { getProductListSearch, ProductsSearchResponse } from 'src/api/products';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import { Sorting } from 'src/types/Sorting';
import { getProduct, ProductResponse } from 'src/api/product';
import axios from 'axios';
import { getInfoAlerts, InfoAlertsResponse } from 'src/api/insights';

import {
  PRODUCT_LIST_ACTION_TYPES,
  ProductListAction,
  productListReducer,
  ProductListState,
} from '../reducers/productListReducer';
import { getMatchesPriceStats, MatchesPriceStatsResponse } from 'src/api/matchesPriceStats';
import { useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';
//import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

const initialState: ProductListState = {
  loading: false,
  error: false,
  data: null,
  total: 0,
  page: 1,
  offset: 1,
  size: 0,
  sorting: null,
  productKey: '',
  manufacturerIds: null,
  priceVarianceIds: null,
  matchesIds: null,
  ownerIds: null,
  categoryId: null,
  sourceOwnerId: '',
  activeIds: 0,
  noMatchIds: 0,
  insightIds: 0,
  customFilterListIds: null,
  initialMatchTypeFilterIds: "ALL",
  initialRegionIds: "-1",
  initialPriceTypeIds: "1",
};

const useProductListFetch = (
  initialSorting: Sorting<ProductFinderInfo>,
  initialPage: number,
  initialSize: number,
  productKey: string,
  initialCategoryId: string,
  initialManufacturerIds: string,
  initialPriceVarianceIds: string,
  initialMatchesIds: string,
  initialOwnerIds: string,
  initialSourceOwnerId: string,
  initialActive: number,
  initialNoMatch: number,
  initialInsight: number,
  initialCustomFilterListIds: string,
  initialMatchTypeFilter: string,
  initialRegion: string,
  initialPriceType: string,
): ProductListState => {
  const [state, dispatch] = useReducer(
    (state: ProductListState, action: ProductListAction) => {
      const fetchState: ProductListState = fetchReducer(state, action) as ProductListState;
      return productListReducer({ ...fetchState }, action);
    },
    {
      ...initialState,
      sorting: initialSorting,
      size: initialSize,
      productKey,
      manufacturerIds: JSON.parse(initialManufacturerIds),
      priceVarianceIds: JSON.parse(initialPriceVarianceIds),
      matchesIds: JSON.parse(initialMatchesIds),
      ownerIds: JSON.parse(initialOwnerIds),
      categoryId: initialCategoryId,
      sourceOwnerId: initialSourceOwnerId,
      activeIds: initialActive,
      noMatchIds: initialNoMatch,
      insightIds: initialInsight,
      customFilterListIds: JSON.parse(initialCustomFilterListIds),
      initialMatchTypeFilterIds: initialMatchTypeFilter,
      initialRegionIds: initialRegion,
      initialPriceTypeIds: initialPriceType,
    }
  );
  const {
    offset,
    page,
    size,
    sorting,
    manufacturerIds,
    priceVarianceIds,
    matchesIds,
    ownerIds,
    categoryId,
    sourceOwnerId,
    activeIds,
    noMatchIds,
    insightIds,
    customFilterListIds,
    initialMatchTypeFilterIds,
    initialRegionIds,
    initialPriceTypeIds
  } = state;

  useEffect(() => {
    if (initialSorting && initialSize && initialPage) {
      dispatch({
        type: PRODUCT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: initialSorting,
          size: initialSize,
          page: initialPage,
          productKey,
          manufacturerIds: JSON.parse(initialManufacturerIds),
          priceVarianceIds: JSON.parse(initialPriceVarianceIds),
          matchesIds: JSON.parse(initialMatchesIds),
          ownerIds: JSON.parse(initialOwnerIds),
          categoryId: initialCategoryId,
          sourceOwnerId: initialSourceOwnerId,
          activeIds: initialActive,
          noMatchIds: initialNoMatch,
          insightIds: initialInsight,
          customFilterListIds: JSON.parse(initialCustomFilterListIds),
          initialMatchTypeFilterIds: initialMatchTypeFilter,
          initialRegionIds: initialRegion,
          initialPriceTypeIds: initialPriceType,
        },
      });
    }
  }, [
    initialSorting,
    initialSize,
    initialPage,
    productKey,
    initialManufacturerIds,
    initialPriceVarianceIds,
    initialMatchesIds,
    initialOwnerIds,
    initialCategoryId,
    initialSourceOwnerId,
    initialActive,
    initialNoMatch,
    initialInsight,
    initialCustomFilterListIds,
    initialMatchTypeFilter,
    initialRegion,
    initialPriceType,
  ]);

  const isSourceProduct = "1";
  let { ownerId, matchTypeFilter, variance } = useProductDetailsStateContext();
  let ownerIdNull = window.localStorage.getItem('ownerId')?.toString()
  let ownerIdLocal = ownerIdNull !== undefined ? ownerIdNull : isSourceProduct;
  let ownerIdss: string = ownerId !== undefined ? ownerId : '';
   let matchTypess: string = matchTypeFilter !== undefined ? matchTypeFilter : 'ALL';
  // let regionss: string = region !== undefined ? region : '-1';
  // let priceTypess: string = priceType !== undefined ? priceType : '1';
  let variancess: string = variance !== undefined ? variance : '';
  
  let sizess: number = size !== undefined ? size : -1;
  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {

        let offset1 = (initialPage - 1) * size + 1;

        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const { products, totalRecords }: ProductsSearchResponse = await getProductListSearch(            
            sorting,
            offset1,
            size,
            productKey,
            categoryId,
            manufacturerIds,
            priceVarianceIds,
            matchesIds,
            ownerIds,
            sourceOwnerId,
            activeIds,
            noMatchIds,
            insightIds,
            customFilterListIds,
            initialMatchTypeFilterIds,
            initialRegionIds,
            initialPriceTypeIds
           
          );
          const requests: Promise<ProductResponse>[] = products.map((productID: ProductId) => getProduct(productID, isSourceProduct, sourceOwnerId,
            ownerIdLocal,
            initialMatchTypeFilter,
            variancess,
            offset1,
            sizess,
            initialRegionIds,
            initialPriceTypeIds
            
          ));
          const priceStatsReq = products.map((productId: ProductId) => getMatchesPriceStats(sourceOwnerId, productId, initialRegion, initialMatchTypeFilter, initialPriceType));
          const alertsReq = products.map((productID: ProductId) => getInfoAlerts(
            sourceOwnerId,
            productID,
            ownerIdss,
            matchTypess,
            variancess,
            offset1,
            sizess,
            //initialMatchTypeFilterIds,
            initialRegionIds,
            initialPriceTypeIds
          ));

          const responsesPriceStats: MatchesPriceStatsResponse[] = await axios.all(priceStatsReq);
          const responsesAlerts: InfoAlertsResponse[] = await axios.all(alertsReq);
          const responses: ProductResponse[] = await axios.all(requests);
          const info: ProductFinderInfo[] = responses.map((response: ProductResponse, index: number) => {
            const priceStats = responsesPriceStats.find(
              price => price.priceStats.productID.toString() === products[index]
            );
            
            const alertsInfo = responsesAlerts.find(alert => alert.productInsight.productID.toString() === products[index]);
            const productListInfo: ProductFinderInfo = { 
              ...response.productDetail,
              ...priceStats,
              matches: priceStats && priceStats.priceStats.noOfMatches,
              key: response.productDetail.ID + '_' + index,
              ...(alertsInfo && alertsInfo.productInsight.insights && { insights: alertsInfo.productInsight.insights }),
              ...(alertsInfo && alertsInfo.productInsight.alerts && { alerts: alertsInfo.productInsight.alerts })

            };
            return productListInfo;
          });
          dispatch({
            type: PRODUCT_LIST_ACTION_TYPES.setProducts,
            payload: { data: [...info], total: Number(totalRecords) },
          });
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    if (sourceOwnerId && initialMatchTypeFilterIds && initialRegionIds && initialPriceTypeIds) {
      fetch();
    }
  }, [
    page,
    size,
    sorting,
    productKey,
    offset,
    categoryId,
    manufacturerIds,
    priceVarianceIds,
    matchesIds,
    ownerIds,
    sourceOwnerId,
    activeIds,
    noMatchIds,
    insightIds,
    customFilterListIds,
    ownerIdss,
    matchTypess,
    variancess,
    initialMatchTypeFilterIds,
    initialRegionIds,
    initialPriceTypeIds
  ]);

  return state;
};

export default useProductListFetch;
