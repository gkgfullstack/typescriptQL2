import { useEffect, useReducer } from 'react';
import {
  useSearchDetailsStateContext,
  useSearchDetailsDispatchContext,
} from 'src/stateProviders/useSearchDetailsStateContext';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import SearchDtlSummary from 'src/types/SearchDtlSummary';
import { getSearchDtlSummary, SearchDtlSummaryResponse } from 'src/api/searchDtlSummary';
import { SEARCH_DETAILS_ACTION_TYPES, SearchDetailsState } from 'src/stateProviders/searchDetailsStateProvider';

const initialState: FetchState<SearchDtlSummary[]> = {
  loading: false,
  error: false,
  data: null,
};

const useSearchDtlSummaryFetch = (): [FetchState<SearchDtlSummary>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  let { searchId, adddtl, jobPropertyUpdate, removeSearchDtl } = useSearchDetailsStateContext();
  const dispatchDetailsContext = useSearchDetailsDispatchContext();

  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (searchId || adddtl) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          let searchIdsss = searchId;
          searchIdsss = searchIdsss === undefined ? '-1' : searchIdsss;
          const response: SearchDtlSummaryResponse = await getSearchDtlSummary(searchIdsss);
          if (response) {
            adddtl = false;
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response, adddtl: false } });

            dispatchDetailsContext({
              type: SEARCH_DETAILS_ACTION_TYPES.setSeachDtlSummary,
              payload: { seachDtlSummary: response } as SearchDetailsState,
            });
          }
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } else if (searchId !== null) {
      }
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [searchId, adddtl, jobPropertyUpdate, removeSearchDtl]);
  return [state as FetchState<SearchDtlSummary>];
};

export default useSearchDtlSummaryFetch;
