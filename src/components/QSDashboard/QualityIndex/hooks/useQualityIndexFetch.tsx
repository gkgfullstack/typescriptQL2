import { useEffect, useReducer } from 'react';
import { QualityIndexResponse, getQualityIndex } from 'src/api/qualityIndex';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
//import { getPriceDistribution } from 'src/api/priceDistribution';
import { sortArrByProp } from 'src/utils';
import { QualityIndexChart } from '../QualityIndexGraph';

const initialState: FetchState<QualityIndexChart> = {
  loading: false,
  error: false,
  data: null,
};

const useQualityIndexFetch = (): FetchState<Array<QualityIndexChart>> => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
      try {
        const distribution: QualityIndexResponse = await getQualityIndex();
        const refactoringData = (distribution.qualityindex )
          .sort(sortArrByProp('sortOrder'))
          .map(elem => ({
            ...elem,
            key: elem.type + '&' + elem.day,
            value: +elem.value,
            
          }));
          
        dispatch({
          type: FETCH_ACTION_TYPES.setData,
          payload: { data: refactoringData },
        });
      } catch (e) {
        dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
      }
    };
      fetch();
  },[]);
//  return state as FetchState<Array<QualityIndexChart>>;
  return state as FetchState<Array<QualityIndexChart>>;
};

export default useQualityIndexFetch;
