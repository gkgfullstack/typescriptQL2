
import { useReducer } from 'react';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { getJobSearchAction, JobNameResponse, SearchNameRequest } from 'src/api/createNewSearchConfig';

const initialState: FetchState<SearchNameRequest> = {
  loading: false,
  error: false,
  data: null,
};

export type JobNameDispatch = {
  addJobName: (searchNameRequest: SearchNameRequest) => void;
};

const useCreateNewFetch = (): [FetchState<JobNameResponse>, JobNameDispatch] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  // const appDispatch = useAppDispatchContext();
  return [
    state as FetchState<JobNameResponse>,
    {
      addJobName: async (SearchNameRequest) => {
        console.log("SearchNameRequest==", SearchNameRequest.SearchName);
        // if (appDispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: JobNameResponse = await getJobSearchAction(SearchNameRequest);
          if (response.success===true) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
          }
          if (response.success===false) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
          }
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
        //}
      },
    },
  ];
};

export default useCreateNewFetch;
