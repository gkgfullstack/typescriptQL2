import { useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { BenchmarkMatchResponse, unBenchmarkProductMatch } from 'src/api/matches';
//import ProductMatchInfo from 'src/types/ProductMatchInfo';
import {
  useProductDetailsDispatchContext,
  useProductDetailsStateContext,
} from 'src/stateProviders/useProductDetailsStateContext';
import { PRODUCT_DETAILS_ACTION_TYPES, ProductDetailsState } from 'src/stateProviders/productDetailsStateProvider';
import { ResponseHeader } from 'src/types/ResponseHeader';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';

const initialState: FetchState<ProductMatchInfo> = {
  loading: false,
  error: false,
  data: null,
};

export type DispatchRemoveMatch = {
  benchmarkMatch: (matchItems: ProductMatchInfo[]) => void;
};

const useMatchUnBenchmarkState = (): [FetchState<ResponseHeader>, DispatchRemoveMatch] => {
  const dispatchDetailsContext = useProductDetailsDispatchContext();
  const { productId} = useProductDetailsStateContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  return [
    state as FetchState<ResponseHeader>,
    {
      benchmarkMatch: async (matchItems: ProductMatchInfo[]) => {
        console.log("match==", matchItems)      
        if (productId && matchItems) { 
          let  targetProductIdssS:string[] = [matchItems[0].productId]; 
          let  canonicalIdS = matchItems[0].canonicalId ; 
          let  benchmarkMatchs = matchItems[0].benchmarkMatch  === '0' ? '0' : '0';
         for(let i = 1; i < matchItems.length; i++ ){
          targetProductIdssS.push(matchItems[i].productId)
         }
        
        
          console.log("targetProductIdss==", targetProductIdssS)
          dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
          try {
            const response: BenchmarkMatchResponse = await unBenchmarkProductMatch(
              productId,
              [...targetProductIdssS],
              canonicalIdS,
              benchmarkMatchs,
            );
            if (response.responseHeader.statusCode === '200') {
              dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.responseHeader } });
              dispatchDetailsContext({
                type: PRODUCT_DETAILS_ACTION_TYPES.unBenchmarkMatches,
                payload: { unBenchmarkedMatches: [...matchItems] } as ProductDetailsState,
              });
            } else {
              dispatch({
                type: FETCH_ACTION_TYPES.setError,
                payload: { error: response.responseHeader.statusMessage },
              });
            }
          } catch (e) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      
      },
    },
  ];
};

export default useMatchUnBenchmarkState;
