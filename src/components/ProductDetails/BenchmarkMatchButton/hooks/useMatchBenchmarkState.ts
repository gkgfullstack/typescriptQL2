import { useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { BenchmarkMatchResponse, benchmarkProductMatch } from 'src/api/matches';
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

const useMatchBenchmarkState = (): [FetchState<ResponseHeader>, DispatchRemoveMatch] => {
  const dispatchDetailsContext = useProductDetailsDispatchContext();
  const { productId } = useProductDetailsStateContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  return [
    state as FetchState<ResponseHeader>,
    {
      benchmarkMatch: async (matchItems: ProductMatchInfo[]) => {
        console.log("match==", matchItems)      
        if (productId && matchItems) { 
          let  targetProductIdssS:string[] =[matchItems[0].productId]; 
          let  canonicalIdS = matchItems[0].canonicalId ; 
          let  benchmarkMatchS = matchItems[0].benchmarkMatch  === '1' ? '1' : '1';          
         for(let i = 1; i < matchItems.length; i++ ){
          targetProductIdssS.push(matchItems[i].productId)
         }
        
        
          dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
          try {
            const response: BenchmarkMatchResponse = await benchmarkProductMatch(
              productId,
              [...targetProductIdssS],
              canonicalIdS,
              benchmarkMatchS

            );
            if (response.responseHeader.statusCode === '200') {
              //let randomUpdate = Math.random();
              dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.responseHeader } });
              dispatchDetailsContext({
                type: PRODUCT_DETAILS_ACTION_TYPES.benchmarkMatches,
                payload: { benchmarkedMatches: [...matchItems]} as ProductDetailsState,
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

export default useMatchBenchmarkState;
