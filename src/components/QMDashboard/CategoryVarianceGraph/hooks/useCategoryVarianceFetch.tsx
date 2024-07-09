import { useEffect, useReducer } from 'react';
import { CategoryVarianceResponse } from 'src/api/categoryVariance';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { getCategoryVariance} from 'src/api/categoryVariance';
import { CategoryVarianceChart } from '../CategoryVarianceGraph';

const initialState: FetchState<CategoryVarianceChart> = {
  loading: false,
  error: false,
  data: null,
};

const useCategoryVarianceFetch = (
  sourceOwnerId: string, matchTypeFilter:string, region:string, priceType:string): FetchState<Array<CategoryVarianceChart>> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const distribution: CategoryVarianceResponse = await getCategoryVariance(sourceOwnerId, matchTypeFilter, region, priceType);
        const refactoringData = (distribution.categoryPriceVarianceList || [])
          //.sort(sortArrByProp('sortOrder'))
          .map(elem => ({
            ...elem,
            key: elem.categoryName,
            value: elem.value,
            start: elem.start,
          }));
        dispatch({
          type: FETCH_ACTION_TYPES.setData,
          payload: { data: refactoringData },
        });
      } catch (e) {
        dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
      }
    };
    if (sourceOwnerId && matchTypeFilter && region && priceType) {
      fetch();
    }
  }, [sourceOwnerId, matchTypeFilter, region, priceType]);

  return state as FetchState<Array<CategoryVarianceChart>>;
};

export default useCategoryVarianceFetch;
