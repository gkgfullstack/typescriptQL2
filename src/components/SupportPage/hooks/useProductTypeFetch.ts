import { useEffect, useReducer } from 'react';
import { useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
//import { ACTION_TYPES, AppState } from 'src/stateProviders/appStateProvider';
import ProductsTypeSupport from 'src/types/ProductsTypeSupport';
import { getProductsType, ProductsTypeResponse } from 'src/api/productsSupportAPI';

const initialState: FetchState<ProductsTypeSupport[]> = {
  loading: false,
  error: false,
  data: null,
};

const useProductTypeFetch = (): [FetchState<ProductsTypeSupport[]>] => {
  const appDispatch = useAppDispatchContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (!ignore) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: ProductsTypeResponse = await getProductsType();
          if ( response) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
          }        
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } 
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [appDispatch]);
  return [state as FetchState<ProductsTypeSupport[]>];
};

export default useProductTypeFetch;
