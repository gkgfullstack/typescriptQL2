import { useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { removeSearchDetail, ScheduleResponse1 } from 'src/api/searchDetails';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';

import { SEARCH_DETAILS_ACTION_TYPES, SearchDetailsState } from 'src/stateProviders/searchDetailsStateProvider';

import { useSearchDetailsDispatchContext, useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';


const initialState: FetchState<SearchDtlListInfo> = {
  loading: false,
  error: false,
  data: null,
};

export type DispatchRemoveSearchDtl = {
  removeSearchDtl: (searchDtlListInfo: SearchDtlListInfo) => void;
};

const useSearchDtlRemovingState = (): [FetchState<string>, DispatchRemoveSearchDtl] => {
  const dispatchDetailsContext = useSearchDetailsDispatchContext();
  let {searchId} = useSearchDetailsStateContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  
  //adddtl= adddtl===true ? false : true
  return [
    state as FetchState<string>,
    {
      removeSearchDtl: async (searchDtlListInfo: SearchDtlListInfo) => {
        if (searchId && searchDtlListInfo) {
          dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
          try {
            const { searchDetailList: data}: ScheduleResponse1 = await removeSearchDetail(
              searchId,
              searchDtlListInfo.type,
            );
            
              dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: data } });
              dispatchDetailsContext({
                type: SEARCH_DETAILS_ACTION_TYPES.removeSearchDtl,
                payload: { removeSearchDtl: data,deleted:true } as SearchDetailsState,
              });
              
           
          } catch (e) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      },
    },
  ];
};

export default useSearchDtlRemovingState;
