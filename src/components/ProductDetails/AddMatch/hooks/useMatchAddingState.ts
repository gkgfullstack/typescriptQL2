import { useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { AddMatchResponse, addProductMatch } from 'src/api/matches';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import { useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';
import MATCH_TYPE from 'src/enums/matchType';
import { ResponseHeader } from 'src/types/ResponseHeader';

const initialState: FetchState<ProductMatchInfo> = {
  loading: false,
  error: false,
  data: null,
};

export type AddMatchRequest = {
  ownerId: string;
  productURL: string;
  productUniqueId: string;
  matchType: keyof typeof MATCH_TYPE;
};

export type DispatchAddMatch = {
  addMatch: (values: AddMatchRequest) => void;
};

const useMatchAddingState = (): [FetchState<ResponseHeader>, DispatchAddMatch] => {
  const { productId } = useProductDetailsStateContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  return [
    state as FetchState<ResponseHeader>,
    {
      addMatch: async (values: AddMatchRequest) => {
        if (productId && values) {
          dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
          try {
            const response: AddMatchResponse = await addProductMatch(
              productId,
              values.ownerId,
              values.productURL,
              values.productUniqueId,
              values.matchType
            );
            if (response.responseHeader.statusCode === '200') {
              dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.responseHeader } });
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

export default useMatchAddingState;
