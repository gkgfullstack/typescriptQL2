import { useEffect, useReducer } from 'react';
import { getRTLPreview, RTLPreviewResponse } from 'src/api/rtlPreview';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
//import RCSearchsType from 'src/types/RCSearchsType';
import RTLPreviewType from 'src/types/RTLPreviewType';
import { Sorting } from 'src/types/Sorting';
import {
  PREVIEW_ACTION_TYPES,
  PreviewAction,
  previewReducer,
  PreviewState,
} from '../../reducers/previewReducer';
//import { useResultViewStateContext } from 'src/stateProviders/useResultViewStateContext';

const initialState: PreviewState = {
  loading: false,
  error: false,
  data: null,
  total: 10,
  page: 1,
  offset: 0,
  size: 10,
  sorting: null,
  resultid:'',
  columnsg:'',
  message:'',
  listdata:'',
};

const usePreviewrFetch = (
  initialSorting: Sorting<RTLPreviewType>,
  initialPage: number,
  initialSize: number,
  resultid:any,
): PreviewState => {
  //let resultId = ""
  //const { resultId } = useResultViewStateContext();
  const [state, dispatch] = useReducer(
    (state: PreviewState, action: PreviewAction) => {
      const fetchState: PreviewState = fetchReducer(state, action) as PreviewState;
      return previewReducer({ ...fetchState }, action);
    },
    { ...initialState, sorting: initialSorting, size: initialSize, resultid }
  );
  const { sorting, offset, page, size, message, listdata } = state;
  console.log('usePreviewFetch', resultid)
  console.log('usePreviewFetch ==== message', message)
  console.log('usePreviewFetch ==== message', listdata)
  useEffect(() => {
    if (initialSorting && initialSize && initialPage) {
      dispatch({
        type: PREVIEW_ACTION_TYPES.updateOptions,
        payload: { sorting: initialSorting, size: initialSize, page: initialPage, resultid },
      });
    }
  }, [initialSorting, initialSize, initialPage, resultid]);
  useEffect(() => {
    const fetch = async () => {
      if (resultid) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const { lineItems: data, TotalRecord, columns:columnsg, message, listdata }: RTLPreviewResponse = await getRTLPreview(
            resultid, 
            offset, 
            size, 
            sorting
            );
          dispatch({
            type: PREVIEW_ACTION_TYPES.setPreview,
            payload: { data: data, columnsg:columnsg, total: Number(TotalRecord), message, listdata },
            
          });
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }  
    };
    fetch();
  }, [resultid, page, size, sorting, offset]);
  return state;
};

export default usePreviewrFetch;
