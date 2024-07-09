import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
import ProductInfo from 'src/types/ProductInfo';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
//import BenchmarkPost from 'src/types/BenchmarkPost';

enum PRODUCT_DETAILS_ACTION_TYPES {
  setProductId = 'SET_PRODUCT_ID',
  setProduct = 'SET_PRODUCT',
  removeMatches = 'REMOVE_MATCHES',
  benchmarkMatches = 'BENCHMARK_MATCHES',
  unBenchmarkMatches = 'UNBENCHMARK',
  //randomUpdate = 'RANDOMUPDATE',
  setOwnerId='OWNERID',
  setMatchType='MATCHTYPE',
  setVariance ='VARIANCE',
  updateOptions ='UPDATEOPTIONS',
  setSourceOwnerId ='SOURCEOWNERID',
  fetchMoreMatches='FETCHMOREMATCHES'
}


export type ProductDetailsState = {
  removedMatches: ProductMatchInfo[];
  benchmarkedMatches: ProductMatchInfo[];
  unBenchmarkedMatches: ProductMatchInfo[];
  productId: string;  
  product: ProductInfo | undefined;
  //randomUpdate:number;
  benchmarkMatch:ProductInfo | undefined;
  removedMatch: ProductInfo | undefined;
  ownerId:string;
  variance:string;
  updateOptions:string;
  offset: number;
  size: number;
  matchTypeFilter:string;
  region:string;
  priceType:string;
  sourceOwnerId:string;
};

export type ProductDetailsAction = {
  type: PRODUCT_DETAILS_ACTION_TYPES;
  payload: ProductDetailsState;
};

export const defaultState: ProductDetailsState = {
  removedMatches: [],
  benchmarkedMatches: [],
  unBenchmarkedMatches: [],
  product: undefined,
  productId: '',
  //randomUpdate:0,
  benchmarkMatch:undefined,
  removedMatch:undefined,  
  ownerId:'',
  variance:'',
  updateOptions:'',
  offset: 1,
  size: 8,
  matchTypeFilter:"ALL",
  region:"-1",
  priceType:"1",
  sourceOwnerId:'1'
};

const DispatchContext: Context<Dispatch<ProductDetailsAction>> = React.createContext<Dispatch<ProductDetailsAction>>(
  {} as Dispatch<ProductDetailsAction>
);
const StateContext: Context<Partial<ProductDetailsState>> = React.createContext<Partial<ProductDetailsState>>({});

export const reducer = (state: ProductDetailsState, action: ProductDetailsAction): ProductDetailsState =>
  produce(state, (draft: ProductDetailsState) => {
    switch (action.type) {
      case PRODUCT_DETAILS_ACTION_TYPES.setProduct: {
        const { product } = action.payload;
        draft.product = product ? { ...product } : undefined;
        return draft;
      }
      
      case PRODUCT_DETAILS_ACTION_TYPES.setProductId: {
        const { productId, sourceOwnerId } = action.payload;
        draft.productId = productId || '1';
        draft.sourceOwnerId = sourceOwnerId || '1';
        draft.product = undefined;

        return draft;
      }
      case PRODUCT_DETAILS_ACTION_TYPES.setSourceOwnerId: {
        const { sourceOwnerId } = action.payload;
        draft.sourceOwnerId = sourceOwnerId || '';
        draft.product = undefined;

        return draft;
      }
      case PRODUCT_DETAILS_ACTION_TYPES.updateOptions: {
        const { updateOptions, region, matchTypeFilter, priceType } = action.payload;
        draft.updateOptions = updateOptions || '';
        draft.region = region || '';
        draft.matchTypeFilter = matchTypeFilter || '';
        draft.priceType = priceType || '';
        draft.product = undefined;

        return draft;
      }

      case PRODUCT_DETAILS_ACTION_TYPES.setOwnerId: {
        const { ownerId, sourceOwnerId } = action.payload;
        draft.ownerId = ownerId;
        draft.sourceOwnerId = sourceOwnerId;
        // draft.region = region;
        // draft.matchTypeFilter = matchTypeFilter;
        // draft.priceType = priceType;
        return draft;
      }
      case PRODUCT_DETAILS_ACTION_TYPES.setMatchType: {
        const { matchTypeFilter,  region , priceType} = action.payload;
        draft.matchTypeFilter = matchTypeFilter;
        draft.region = region;
        draft.matchTypeFilter = matchTypeFilter;
        draft.priceType = priceType;
        return draft;
      }
      case PRODUCT_DETAILS_ACTION_TYPES.fetchMoreMatches: {
        const { size } = action.payload;        
          draft.size = size;
        return draft;
      }
      case PRODUCT_DETAILS_ACTION_TYPES.setVariance: {
        const { size, variance } = action.payload;
        draft.size = size;
        draft.variance = variance;
        // draft.region = region;
        // draft.matchTypeFilter = matchTypeFilter;
        // draft.priceType = priceType;
        return draft;
      }
           
      // case PRODUCT_DETAILS_ACTION_TYPES.randomUpdate: {
      //   const { randomUpdate } = action.payload;
      //   draft.randomUpdate = randomUpdate ; 
      //   // draft.region = region;
      //   // draft.matchTypeFilter = matchTypeFilter;
      //   // draft.priceType = priceType;

      //   return draft;
      // }
      case PRODUCT_DETAILS_ACTION_TYPES.removeMatches: {
        const { removedMatches } = action.payload;
        draft.removedMatches = removedMatches  || ''
        draft.removedMatch = undefined;
        // draft.matchTypeFilter = matchTypeFilter;
        // draft.region = region;
        // draft.matchTypeFilter = matchTypeFilter;
        // draft.priceType = priceType;
        return draft;
      }
   
      case PRODUCT_DETAILS_ACTION_TYPES.benchmarkMatches: {
        const { benchmarkedMatches } = action.payload;        
        draft.benchmarkedMatches = benchmarkedMatches || '';
        draft.benchmarkMatch = undefined;
        return draft;
      }

      case PRODUCT_DETAILS_ACTION_TYPES.unBenchmarkMatches: {
        const { unBenchmarkedMatches } = action.payload;        
        draft.unBenchmarkedMatches = unBenchmarkedMatches || '';
        draft.benchmarkMatch = undefined;
        return draft;
      }     
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  });

export const DispatchProductDetailsProvider = DispatchContext.Provider;
export const ProductDetailsStateContextProvider = StateContext.Provider;
type ProductDetailsStateProviderProps = {
  children: React.ReactNode;
};

const ProductDetailsStateProvider: React.FC<ProductDetailsStateProviderProps> = ({
  children,
}: ProductDetailsStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchProductDetailsProvider value={dispatch}>
      <ProductDetailsStateContextProvider value={state}>{children}</ProductDetailsStateContextProvider>
    </DispatchProductDetailsProvider>
  );
};

export { ProductDetailsStateProvider, DispatchContext, StateContext, PRODUCT_DETAILS_ACTION_TYPES };
