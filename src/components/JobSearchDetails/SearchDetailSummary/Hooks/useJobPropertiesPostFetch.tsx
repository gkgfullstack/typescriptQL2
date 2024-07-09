
import { useReducer } from 'react';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { JobPropertiesPostResponse } from 'src/api/CreateJobPropertiesAPIPost';
import { updateJobProperties } from 'src/api/CreateJobPropertiesAPIPost';
//import { getAirFareJobSearchAction, AirFareLineItemResponse } from 'src/api/createNewSearchConfig';
import  CreateJobPropertiesTypePost  from 'src/types/CreateJobPropertiesTypePost';
//import { SEARCHDTL_ACTION_TYPES } from '../../reducers/scheduleReducer';
import { SearchDetailsState, SEARCH_DETAILS_ACTION_TYPES } from 'src/stateProviders/searchDetailsStateProvider';
import { useSearchDetailsDispatchContext } from 'src/stateProviders/useSearchDetailsStateContext';
//import { useHistory } from 'react-router';

const initialState: FetchState<CreateJobPropertiesTypePost> = {
  loading: false,
  error: false,
  data: null,
};

export type JobNameDispatch = {
  updateJobPropertiesItems: (values:any,fromPage:string,form:any) => void;
};

const useJobPropertiesPostFetch = (): [FetchState<JobPropertiesPostResponse>, JobNameDispatch] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const dispatchDetailsContext = useSearchDetailsDispatchContext();
  //const history = useHistory();
  // const appDispatch = useAppDispatchContext();
  return [
    state as FetchState<JobPropertiesPostResponse>,
    {
      updateJobPropertiesItems: async (values) => {
        console.log("SearchNameRequest==", values);
        // if (appDispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: JobPropertiesPostResponse = await updateJobProperties(values);
           if (response!==undefined ) {
            if(response){
              alert(response);
            dispatchDetailsContext({
              type: SEARCH_DETAILS_ACTION_TYPES.setJobProperties,
              payload: { jobPropertyUpdate:true } as SearchDetailsState,
            });

          }
         
          }
          
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
        //}
      },
    },
  ];
};

export default useJobPropertiesPostFetch;


