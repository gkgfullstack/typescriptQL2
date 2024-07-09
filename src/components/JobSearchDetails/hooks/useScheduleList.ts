import { useEffect, useReducer } from 'react';
import { getScheduleList, ScheduleResponse } from 'src/api/schedule';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
import Schedule from 'src/types/Schedule';
import { Sorting } from 'src/types/Sorting';
import {
  SEARCHDTL_ACTION_TYPES,
  SearcheDtlAction,
  scheduleReducer,
  SearchDtlState,
} from '../reducers/scheduleReducer';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';

const initialState: SearchDtlState = {
  loading: false,
  error: false,
  data: null,
  total: 0,

  
  sorting: null,

};

const useScheduleListFetch = (
  initialSorting: Sorting<Schedule>,
): [SearchDtlState] => {
  const { searchId,deleteds } = useSearchDetailsStateContext();
  const [state, dispatch] = useReducer(
    (state: SearchDtlState, action: SearcheDtlAction) => {
      const fetchState: SearchDtlState = fetchReducer(state, action) as SearchDtlState;
      return  scheduleReducer({ ...fetchState }, action);
    },
    { ...initialState, sorting: initialSorting }
  );
  const { sorting } = state;
 
  useEffect(() => {
    if (initialSorting  ) {
      dispatch({
        type: SEARCHDTL_ACTION_TYPES.updateOptions,
        payload: { sorting: initialSorting },
      });
    }
  }, [initialSorting]);

  useEffect(() => {
    const fetch = async () => {
      if (searchId || deleteds) {
        if(searchId){
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const { scheduleList: data}: ScheduleResponse = await getScheduleList(searchId,
          sorting
          );
          dispatch({
            type: SEARCHDTL_ACTION_TYPES.setSearchDtl,
            payload: { data: [...data], total: Number(101) },
          });
          
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
      }
    };
    fetch();
  }, [searchId, deleteds, sorting]);

  return[state] ;
};

export default useScheduleListFetch;
