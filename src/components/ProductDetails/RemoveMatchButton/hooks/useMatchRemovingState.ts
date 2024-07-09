import { useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { RemoveMatchResponse, removeProductMatch } from 'src/api/matches';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import {
  useProductDetailsDispatchContext,
  useProductDetailsStateContext,
} from 'src/stateProviders/useProductDetailsStateContext';
import { PRODUCT_DETAILS_ACTION_TYPES, ProductDetailsState } from 'src/stateProviders/productDetailsStateProvider';
import { ResponseHeader } from 'src/types/ResponseHeader';

const initialState: FetchState<ProductMatchInfo> = {
  loading: false,
  error: false,
  data: null,
};

export type DispatchRemoveMatch = {
  removeMatch: (matchItems: ProductMatchInfo[]) => void;
};

const useMatchRemovingState = (): [FetchState<ResponseHeader>, DispatchRemoveMatch] => {
  const dispatchDetailsContext = useProductDetailsDispatchContext();
  const { productId } = useProductDetailsStateContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);
//   let ownerIdss = ownerId !== undefined ? ownerId : ''
// let matchTypess = matchType !== undefined ? matchType : ''
// let variancess = variance !== undefined ? variance : ''
  return [
    state as FetchState<ResponseHeader>,
    {
      removeMatch: async (matchItems: ProductMatchInfo[]) => {
        if (productId && matchItems) {
          let  targetProductIdssS:string[] =[matchItems[0].productId]; 
          let  canonicalIdS = matchItems[0].canonicalId ;
         for(let i=1;i<matchItems.length;i++){
          targetProductIdssS.push(matchItems[i].productId)
         }
          dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
          try {
            const response: RemoveMatchResponse = await removeProductMatch(
              productId,
              [...targetProductIdssS],
              canonicalIdS,
            );
            if (response.responseHeader.statusCode === '200') {
              dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.responseHeader } });
              dispatchDetailsContext({
                type: PRODUCT_DETAILS_ACTION_TYPES.removeMatches,
                payload: { removedMatches: [...matchItems] } as ProductDetailsState,
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

export default useMatchRemovingState;
