
import { useReducer } from 'react';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
import { getAddSchedule, ScheduleResponse1, ScheduleResponse2} from 'src/api/addSchedule';
import AddScheduleType from 'src/types/AddScheduleType';
import { useSearchDetailsDispatchContext, useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';
import { SEARCH_DETAILS_ACTION_TYPES,SearchDetailsState } from 'src/stateProviders/searchDetailsStateProvider';
import { SEARCHDTL_ACTION_TYPES } from 'src/components/JobSearchDetails/reducers/scheduleReducer';
import { message } from 'antd';




const initialState: FetchState<AddScheduleType> = {
  loading: false,
  error: false,
  data: null,
};

export type AddScheduleDispatch = {
  addScheduleJob: (searchNameRequest: AddScheduleType) => void;
  
};

const useAddScheduleFetch = (fromPage?:any,searchIds?:string): [FetchState<ScheduleResponse1>, AddScheduleDispatch] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const dispatchDetailsContext = useSearchDetailsDispatchContext();
  let {searchId} = useSearchDetailsStateContext();
  if(fromPage==="jobpage"){
    searchId=searchIds;
  }
  return [
    state as FetchState<ScheduleResponse1>,
    {
      addScheduleJob: async (addScheduleInputs) => {
      if(searchId!==undefined){
        addScheduleInputs.sSearchIds=searchId;
        console.log("SearchNameRequest==", addScheduleInputs.addType);
        // if (appDispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: ScheduleResponse2= await getAddSchedule(addScheduleInputs);
         if(fromPage==="jobpage" && response.success===true){
           message.success(response.message);
         }
         else if(response.success===true){
          message.success(response.message);
         dispatch({
          type: SEARCHDTL_ACTION_TYPES.setSearchDtl,
          payload: { data: [...response.value], total: Number(101) },
        });
        dispatchDetailsContext({
              type: SEARCH_DETAILS_ACTION_TYPES.addScheduleJob,
              payload: { addScheduleJob: response.value, addSched: true } as unknown as SearchDetailsState,
            });
         }
         else if(response.success===false) {
          message.error(response.message);
         } 
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
        }
      },
    },
  ];
};

export default useAddScheduleFetch;
