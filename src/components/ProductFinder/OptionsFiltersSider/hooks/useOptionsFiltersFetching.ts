import { OptionsProductFinderFilters } from 'src/types/OptionsProductFinderFilters';
import { OptionsFiltersResponse } from 'src/api/optionsFilters';
import { getOptionsFilters } from 'src/api/optionsFilters';
import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';

const initialState: FetchState<OptionsProductFinderFilters> = {
  loading: false,
  error: false,
  data: null,
};

const useOptionsFiltersFetching = (sourceOwnerId: string): FetchState<OptionsProductFinderFilters> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: OptionsFiltersResponse = await getOptionsFilters(sourceOwnerId);
          const filters = response && response;
          console.log("filters============ filters ======", filters)
          const customFilters = {
              ...filters                        
            };
          dispatch({
            type: FETCH_ACTION_TYPES.setData,
            payload: { data: customFilters },
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

  return state as FetchState<OptionsProductFinderFilters>;
};

export default useOptionsFiltersFetching;
