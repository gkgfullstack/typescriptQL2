import { useEffect, useReducer } from 'react';
import { AppParamResponse, getAppParamValues } from 'src/api/createNewSearchConfig';

import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';



const initialState: FetchState<AppParamResponse> = {
  loading: false,
  error: false,
  data: null,
};

const useAppParamFetch = (vertical:string): [FetchState<AppParamResponse>] => {
 
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  
  useEffect(() => {
    let ignore = false;
    const fetch = async () => {
      if (vertical) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: AppParamResponse = await getAppParamValues(vertical);
         
          if (response!==undefined) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response } });
            
          }
        } catch (e) {
          if (!ignore) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      } 
    };
    fetch();
    return (): void => {
      ignore = true;
    };
  }, [vertical]);
  return [state as FetchState<AppParamResponse>];
};

export default useAppParamFetch;
