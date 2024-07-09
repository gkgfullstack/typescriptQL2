import ProductInfo from 'src/types/ProductInfo';
import { useReducer } from 'react';
//import { useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { FETCH_ACTION_TYPES, fetchReducer, FetchState } from 'src/reducers/fetchReducer';
//import { ACTION_TYPES } from 'src/stateProviders/appStateProvider';
import { getDeleterow, DeleterowResponse, deleterows } from 'src/api/rdDtlSummary';
//import { ResponseHeader } from 'src/types/ResponseHeader';

const initialState: FetchState<ProductInfo> = {
  loading: false,
  error: false,
  data: null,
};

export type DeleteActionDispatch = {
  deleteaction: (deleterows: deleterows) => void;
};

const useResultsRowDeleteFetch = (): [FetchState<DeleterowResponse>, DeleteActionDispatch] => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  // const appDispatch = useAppDispatchContext();
  return [
    state as FetchState<DeleterowResponse>,
    {
      deleteaction: async (deleterows) => {
        console.log("jobActionInputs==", deleterows.runId);
        // if (appDispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const response: DeleterowResponse = await getDeleterow(deleterows);
          console.log("messsage===", response.message);
          if (response) {
            dispatch({ type: FETCH_ACTION_TYPES.setData, payload: { data: response.message } });
            //appDispatch({ type: ACTION_TYPES.cleanupUserDetails });
          }
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
        //}
      },
    },
  ];
};

export default useResultsRowDeleteFetch;
