import { useEffect, useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import SiteCodeType from 'src/types/SiteCodeType';
import { getSiteCode, SiteCodeResponse } from 'src/api/SiteCodeAPI';

const initialState: FetchState<SiteCodeType[]> = {
  loading: false,
  error: false,
  data: null,
};

const useSiteCodeFetch = (vertical: string, appType?: string): [FetchState<SiteCodeType[]>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (vertical) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: SiteCodeResponse = await getSiteCode(vertical, appType);

          if (response !== undefined) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.siteDataList } });
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
  }, [vertical, appType]);
  return [state as FetchState<SiteCodeType[]>];
};

export default useSiteCodeFetch;
