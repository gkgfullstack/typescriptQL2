import { ProductFinderFilters } from 'src/types/ProductFinderFilters';
import { AdvancedFiltersResponse } from 'src/api/qmatchFilters';
import { getAdvancedFilters } from 'src/api/qmatchFilters';
import { CustomAdvancedFiltersResponse } from 'src/api/qmatchFilters';
import { getCustomFilters } from 'src/api/qmatchFilters';
import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';

const initialState: FetchState<ProductFinderFilters> = {
  loading: false,
  error: false,
  data: null,
};

const useAdvancedFiltersFetching = (sourceOwnerId: string, matchType:any, region:any, priceType:any): FetchState<ProductFinderFilters> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: AdvancedFiltersResponse = await getAdvancedFilters(sourceOwnerId, matchType, region, priceType);
          const filters = response && response.advanceFilterMenu && response.advanceFilterMenu.filterList;
          const responses: CustomAdvancedFiltersResponse = await getCustomFilters(sourceOwnerId);
          const filterss = responses && responses.customFilter && responses.customFilter ;

            const customFilters = {
              ...filters,
              ...filterss,          
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
    if (sourceOwnerId && matchType && region && priceType) {
      fetch();
    }
  }, [sourceOwnerId, matchType, region, priceType]);

  return state as FetchState<ProductFinderFilters>;
};

export default useAdvancedFiltersFetching;
