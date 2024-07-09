import { useReducer } from 'react';
import { fetchReducer, FETCH_ACTION_TYPES, FetchState } from 'src/reducers/fetchReducer';
import { removeSchedule, ScheduleResponse1 } from 'src/api/schedule';
import Schedule from 'src/types/Schedule';

import { SEARCH_DETAILS_ACTION_TYPES, SearchDetailsState } from 'src/stateProviders/searchDetailsStateProvider';

import { useSearchDetailsDispatchContext, useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';
import {
  SEARCHDTL_ACTION_TYPES,
 } from '../../reducers/scheduleReducer';
const initialState: FetchState<Schedule> = {
  loading: false,
  error: false,
  data: null,
};

export type DispatchRemoveSchedule = {
  removeSchedule: (schedule: Schedule) => void;
};

const useScheduleRemovingState = (): [FetchState<string>, DispatchRemoveSchedule] => {
  const dispatchDetailsContext = useSearchDetailsDispatchContext();
  const {searchId} = useSearchDetailsStateContext();
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  return [
    state as FetchState<string>,
    {
      removeSchedule: async (schedule: Schedule) => {
        if (searchId && schedule) {
          dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
          try {
            const { scheduleList: data}: ScheduleResponse1= await removeSchedule(
              searchId,
              schedule.id,
            );
            
            dispatch({
              type: SEARCHDTL_ACTION_TYPES.setSearchDtl,
              payload: { data: [...data], total: Number(101) },
            });
              dispatchDetailsContext({
                type: SEARCH_DETAILS_ACTION_TYPES.removeSchedule,
                payload: { removeSchedule: data,deleteds:true } as SearchDetailsState,
              });
            } 
           catch (e) {
            dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
          }
        }
      },
    },
  ];
};

export default useScheduleRemovingState;
