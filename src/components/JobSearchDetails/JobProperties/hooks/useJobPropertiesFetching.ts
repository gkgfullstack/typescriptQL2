import  CreateJobPropertiesType  from 'src/types/CreateJobPropertiesType';
import { JobPropertiesResponse } from 'src/api/CreateJobPropertiesAPI';
import { getJobProperties } from 'src/api/CreateJobPropertiesAPI';
import { useEffect, useReducer } from 'react';
import { FETCH_ACTION_TYPES, FetchState, fetchReducer } from 'src/reducers/fetchReducer';
import { useSearchDetailsDispatchContext, useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';
import { SearchDetailsState, SEARCH_DETAILS_ACTION_TYPES } from 'src/stateProviders/searchDetailsStateProvider';

const initialState: FetchState<CreateJobPropertiesType> = {
  loading: false,
  error: false,
  data: null,
};

const useJobPropertiesFetching = (jobId: any): FetchState<CreateJobPropertiesType> => {
  
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  let { jobPropertyUpdate } = useSearchDetailsStateContext();
  const dispatchDetailsContext = useSearchDetailsDispatchContext();
  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: JobPropertiesResponse = await getJobProperties(jobId);
          const responseJobProperties = response && response.jobProperties && response.jobProperties ;
          
          dispatch({
            type: FETCH_ACTION_TYPES.setData,
            payload: {data: responseJobProperties},
          });
          dispatchDetailsContext({
            type: SEARCH_DETAILS_ACTION_TYPES.setJobProperties,
            payload: { jobPropertyUpdate:false } as SearchDetailsState,
          });

        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    if (jobId) {
      fetch();
    }
  }, [jobId,jobPropertyUpdate, dispatchDetailsContext]);

  return state as FetchState<CreateJobPropertiesType>;
};

export default useJobPropertiesFetching;
