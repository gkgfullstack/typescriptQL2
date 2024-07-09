import { useEffect, useReducer } from 'react';
import { getSearchDetailList, SearchDetailResponse } from 'src/api/searchDetails';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';
import { Sorting } from 'src/types/Sorting';
import {
  SEARCHDTL_ACTION_TYPES,
  SearcheDtlAction,
  searchDtlReducer,
  SearchDtlState,
} from '../reducers/searchDtlReducer';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';

const initialState: SearchDtlState = {
  loading: false,
  error: false,
  data: null,
  total: 0,  
  sorting: null,
  getJobProperties:undefined,
  postJobProperties:undefined,
};

const useSearchDetailsListFetch = (
  initialSorting: Sorting<SearchDtlListInfo>,
): [SearchDtlState] => {
  const { searchId ,deleted,adddtl,removeSearchDtl} = useSearchDetailsStateContext();
  const [state, dispatch] = useReducer(
    (state: SearchDtlState, action: SearcheDtlAction) => {
      const fetchState: SearchDtlState = fetchReducer(state, action) as SearchDtlState;
      return  searchDtlReducer({ ...fetchState }, action);
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
      if (searchId) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          const { searchDetailList: data}: SearchDetailResponse = await getSearchDetailList(searchId,
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
    };
    fetch();
  }, [searchId,  sorting,deleted,adddtl,removeSearchDtl]);

  return[state] ;
};

export default useSearchDetailsListFetch;
