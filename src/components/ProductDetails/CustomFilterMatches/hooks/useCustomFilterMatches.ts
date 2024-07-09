import { MatchFiltersResponse } from 'src/api/matchFilters';
import { getMatchFilters } from 'src/api/matchFilters';
import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';
import FilterMatch from 'src/types/FilterMatch';

const initialState: FetchState<FilterMatch> = {
  loading: false,
  error: false,
  data: null,
};

const useCustomFilterMatches = (sourceOwnerId: string, productId:string): FetchState<FilterMatch> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: MatchFiltersResponse = await getMatchFilters(sourceOwnerId, productId);
          const filters = response && response.advanceFilterMenu && response.advanceFilterMenu.filterList;
 
          dispatch({
            type: FETCH_ACTION_TYPES.setData,
            payload: { data: filters },
          });
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    if (sourceOwnerId) {
      fetch();
    }
  }, [sourceOwnerId]);

  return state as FetchState<FilterMatch>;
};

export default useCustomFilterMatches;
