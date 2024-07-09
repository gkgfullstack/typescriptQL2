import { useEffect, useReducer } from 'react';
import { getPreviewApiVIew, PreviewApiVIewResponse } from 'src/api/searchDetails';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
import PreviewTypeVIew from 'src/types/PreviewTypeVIew';
import { Sorting } from 'src/types/Sorting';
import {
  PREVIEW_ACTION_TYPES,
  PreviewAction,
  previewReducer,
  PreviewState,
} from '../../reducers/previewReducer';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';

const initialState: PreviewState = {
  loading: false,
  error: false,
  data: null,
  total: 10,
  page: 1,
  offset: 0,
  size: 10,
  sorting: null,
  columnsg:''
};

const usePreviewFetch = (
  initialSorting: Sorting<PreviewTypeVIew>,
  initialPage: number,
  initialSize: number,
): PreviewState => {
  let { searchId, adddtl} = useSearchDetailsStateContext();
  const [state, dispatch] = useReducer(
    (state: PreviewState, action: PreviewAction) => {
      const fetchState: PreviewState = fetchReducer(state, action) as PreviewState;
      return previewReducer({ ...fetchState }, action);
    },
    { ...initialState, sorting: initialSorting, size: initialSize }
  );
  const { sorting, offset, page, size } = state;
  useEffect(() => {
    if (initialSorting && initialSize && initialPage) {
      dispatch({
        type: PREVIEW_ACTION_TYPES.updateOptions,
        payload: { sorting: initialSorting, size: initialSize, page: initialPage },
      });
    }
  }, [initialSorting, initialSize, initialPage]);
  useEffect(() => {
    const fetch = async () => {
      if (searchId || adddtl) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          let searchIdsss = searchId
          searchIdsss = searchIdsss === undefined ? '-1' : searchIdsss
          const { lineitems: data, TotalRecord, columns:columnsg }: PreviewApiVIewResponse = await getPreviewApiVIew(
            searchIdsss, 
            offset, 
            size, 
            sorting
            );
          dispatch({
            type: PREVIEW_ACTION_TYPES.setPreview,
            payload: { data: data, columnsg:columnsg, total: Number(TotalRecord) },
            
          });
          
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }  
    };
    fetch();
  }, [searchId, page, size, sorting, offset, adddtl]);
  return state;
};

export default usePreviewFetch;
