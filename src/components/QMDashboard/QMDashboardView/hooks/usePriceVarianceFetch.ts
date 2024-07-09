import { useEffect, useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { AdvancedFiltersResponse, getAdvancedFilters } from 'src/api/qmatchFilters';
import { PriceVarianceFilter } from 'src/types/PriceVarianceFilter';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

const initialState: FetchState<PriceVarianceFilter[]> = {
  loading: false,
  error: false,
  data: null,
};

const usePriceVarianceFetch = (): [FetchState<PriceVarianceFilter[]>] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const sourceOwnerId = useSourceOwnerId();
  let  { region, matchTypeFilter, priceType } = useQueryUrlParams(); 

  let initialMatchTypeFilterIds:string = matchTypeFilter  !== undefined ? matchTypeFilter :"ALL";
  let initialRegionIds:string = region  !== undefined ? region :"-1";
  let initialPriceTypeIds:string = priceType  !== undefined ? priceType :"1";
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const response: AdvancedFiltersResponse = await getAdvancedFilters(sourceOwnerId, initialMatchTypeFilterIds, initialRegionIds, initialPriceTypeIds );
        if (!ignore) {
          dispatch({
            type: FETCH_ACTION_TYPES.setData,
            payload: { data: response.advanceFilterMenu.filterList.variance },
          });
        }
      } catch (e) {
        if (!ignore) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    if (sourceOwnerId && initialMatchTypeFilterIds && initialRegionIds && initialPriceTypeIds) {
      fetch();
    }
    return (): void => {
      ignore = true;
    };
  }, [sourceOwnerId, initialMatchTypeFilterIds, initialRegionIds, initialPriceTypeIds]);
  return [state as FetchState<PriceVarianceFilter[]>];
};

export default usePriceVarianceFetch;
