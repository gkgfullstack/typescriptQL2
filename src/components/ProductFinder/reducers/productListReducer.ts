import produce from 'immer';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from 'src/types/Sorting';

export enum PRODUCT_LIST_ACTION_TYPES {
  updateOptions = 'UPDATE_OPTIONS',
  setProducts = 'SET_PRODUCTS',
}

export type ProductListState = FetchState<Array<ProductFinderInfo>> & {
  total: number;
  page: number;
  offset: number;
  size: number;
  sorting: Sorting<ProductFinderInfo> | null;
  productKey: string;
  manufacturerIds: string[] | null;
  priceVarianceIds: string[] | null;
  matchesIds: string[] | null;
  ownerIds: string[] | null;
  categoryId: string | null;
  sourceOwnerId: string;
  activeIds: number;
  noMatchIds:number;
  insightIds:number;
  customFilterListIds:string[] | null;
  initialMatchTypeFilterIds:string,
  initialRegionIds:string,
  initialPriceTypeIds:string,
};

export type UpdateOptionsAction = {
  type: PRODUCT_LIST_ACTION_TYPES.updateOptions;
  payload: Pick<
    ProductListState,
    | 'sorting'
    | 'size'
    | 'page'
    | 'productKey'
    | 'manufacturerIds'
    | 'priceVarianceIds'
    | 'matchesIds'
    | 'ownerIds'
    | 'categoryId'
    | 'sourceOwnerId'
    | 'activeIds'
    | 'noMatchIds'
    | 'insightIds'
    | 'customFilterListIds'
    | 'initialMatchTypeFilterIds'
    | 'initialRegionIds'
    | 'initialPriceTypeIds'
  >;
};

export type SetProductsAction = {
  type: PRODUCT_LIST_ACTION_TYPES.setProducts;
  payload: Pick<ProductListState, 'data' | 'total'>;
};

export type ProductListAction = Action<Array<ProductFinderInfo>> | UpdateOptionsAction | SetProductsAction;

const calcOffset = (page: number, size: number): number => {
  if (page > 1) {
    return (page - 1) * size + 1;
  } else {
    return page;
  }
};

export const productListReducer = (state: ProductListState, action: ProductListAction): ProductListState =>
  produce(state, (draft: ProductListState) => {
    switch (action.type) {
      case PRODUCT_LIST_ACTION_TYPES.setProducts: {
        const { data, total } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.total = total;
        if (data) {
          draft.data = data;
        }
        return draft;
      }
      case PRODUCT_LIST_ACTION_TYPES.updateOptions: {
        const {
          sorting,
          size,
          page,
          productKey,
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
        } = action.payload;
        //draft.offset = 1;
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
          draft.offset = 1;
        }
        if (JSON.stringify(manufacturerIds) !== JSON.stringify(draft.manufacturerIds)) {
          draft.manufacturerIds = manufacturerIds;
        }
        if (JSON.stringify(priceVarianceIds) !== JSON.stringify(draft.priceVarianceIds)) {
          draft.priceVarianceIds = priceVarianceIds;
        }
        if (JSON.stringify(matchesIds) !== JSON.stringify(draft.matchesIds)) {
          draft.matchesIds = matchesIds;
        }
        if (JSON.stringify(ownerIds) !== JSON.stringify(draft.ownerIds)) {
          draft.ownerIds = ownerIds;
        }
       
        if (size) {
          draft.size = size;
        }
        if (productKey !== draft.productKey) {
          draft.productKey = productKey;
        }
        if (categoryId !== draft.categoryId) {
          draft.categoryId = categoryId;
        }
        if (sourceOwnerId !== draft.sourceOwnerId) {
          draft.sourceOwnerId = sourceOwnerId;
        }
        // if (active !== draft.active) {
        //   draft.active = active;
        // }
        if (JSON.stringify(activeIds) !== JSON.stringify(draft.activeIds)) {
          draft.activeIds = activeIds;
          
        }
        if (JSON.stringify(noMatchIds) !== JSON.stringify(draft.noMatchIds)) {
          draft.noMatchIds = noMatchIds;
        }
        if (JSON.stringify(insightIds) !== JSON.stringify(draft.insightIds)) {
          draft.insightIds = insightIds;
        }
        if (JSON.stringify(customFilterListIds) !== JSON.stringify(draft.customFilterListIds)) {
          draft.customFilterListIds = customFilterListIds;
        }
        if (initialMatchTypeFilterIds !== draft.initialMatchTypeFilterIds) {
          draft.initialMatchTypeFilterIds = initialMatchTypeFilterIds;
        }
        if (initialRegionIds !== draft.initialRegionIds) {
          draft.initialRegionIds = initialRegionIds;
        }
        if (initialPriceTypeIds !== draft.initialPriceTypeIds) {
          draft.initialPriceTypeIds = initialPriceTypeIds;
        }
        
        if (page !== draft.page && draft.data) {
          const currOffset = calcOffset(page, size);
          draft.offset = currOffset;
          draft.page = page;
        }
        return draft;
      }
      default: {
        return draft;
      }
    }
  });
