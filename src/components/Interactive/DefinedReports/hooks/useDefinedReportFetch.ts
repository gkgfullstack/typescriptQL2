import ProductInfo from 'src/types/ProductInfo';
import { useEffect, useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { getDefinedReportURL, DefinedReportResponse } from 'src/api/interactiveReports';

const initialState: FetchState<ProductInfo> = {
  loading: false,
  error: false,
  data: null,
};

const useDefinedReportFetch = (reprtName:string): [FetchState<string>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const response: DefinedReportResponse = await getDefinedReportURL(reprtName);
        if (!ignore) {
          dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.reportURL } });
        }
      } catch (e) {
        if (!ignore) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, []);
  return [state as FetchState<string>];
};

export default useDefinedReportFetch;
