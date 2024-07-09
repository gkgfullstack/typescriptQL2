import { useEffect, useReducer } from 'react';
import { getResultlist, ResultlistResponse } from 'src/api/tableJobResultlist';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
import TableResultlistType from 'src/types/TableResultlistType';
import { Sorting } from 'src/types/Sorting';


import {
  RT_LIST_ACTION_TYPES,
  ResultsTableListAction,
  resultsTableListReducer,
  ResultsTableListState,
} from '../reducers/resultsTableListReducer';

const initialState: ResultsTableListState = {
  loading: false,
  error: false,
  data: null,
  total: 0,
  page: 1,
  offset: 1,
  size: 0,
  jobName: '',
  sorting: null,
  appId: '',
  jobId: '',
  createdStart:'',
  createdEnd:'',
  lastrunStart:'',
  lastrunEnd:'',
  finishedStart:'',
  finishedEnd:'',
  updatedStart:'',
  updatedEnd:'',
  searchFilterConditionGet: '',
  errorMsg:'',
};

const useResultsTableFetch = (
  initialSorting: Sorting<TableResultlistType>,
  initialPage: number,
  initialSize: number,
  initialAppId: number,
  jobId:any,
  jobName: any,
  createdStart:any,
  createdEnd:any,
  lastrunStart:any,
  lastrunEnd:any,
  finishedStart:any,
  finishedEnd:any,
  updatedStart:any,
  updatedEnd:any,
  errorMsg:any,
  
): ResultsTableListState => {
  const [state, dispatch] = useReducer(
    (state: ResultsTableListState, action: ResultsTableListAction) => {
      const fetchState: ResultsTableListState = fetchReducer(state, action) as ResultsTableListState;
      return resultsTableListReducer({ ...fetchState }, action);
    },
    {
      ...initialState,
      jobId,
      jobName,
      createdStart,
      createdEnd,
      lastrunStart,
      lastrunEnd,
      finishedStart,
      finishedEnd,
      updatedStart,
      updatedEnd,
      sorting: initialSorting,
      size: initialSize,
      appId: initialAppId,
      errorMsg,

    }
  );
  let { offset, page, size, sorting, appId } = state;
 
  useEffect(() => {
    if (initialSorting && initialSize && initialPage) {
      dispatch({
        type: RT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: initialSorting,
          jobId,
          jobName,
          createdStart,
          createdEnd,
          lastrunStart,
          lastrunEnd,
          finishedStart,
          finishedEnd,
          updatedStart,
          updatedEnd,
          
          size: initialSize,
          page: initialPage,
          appId: initialAppId,
         
        },
      });
    }
  }, [
    initialSorting,
    initialSize,
    jobId,
    jobName,
    createdStart,
    createdEnd,
    lastrunStart,
    lastrunEnd,
    finishedStart,
    finishedEnd,
    updatedStart,
    updatedEnd,
    initialPage,
    initialAppId,
    errorMsg,
    ]);

  useEffect(() => {
    const fetch = async () => {
      if (dispatch && jobId) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          
          
          const { resultList: data, totalRecords }: ResultlistResponse = await getResultlist(
            offset,
            size,
            sorting,
            appId,
            jobId,
            jobName,
            createdStart,
            createdEnd,
            lastrunStart,
            lastrunEnd,
            finishedStart,
            finishedEnd,
            updatedStart,
            updatedEnd
          );
          
          if(offset<=1){
            localStorage.setItem("totalRecordsJobs",String(totalRecords));
          }
          dispatch({
            type: RT_LIST_ACTION_TYPES.setResultsTable,
            payload: { data: [...data], total: Number(totalRecords), errorMsg:errorMsg },
          });
        } catch (e) {
          dispatch({ type: FETCH_ACTION_TYPES.setError, payload: { error: e } });
        }
      }
    };
    fetch();
  }, [
    page,
    size,
    sorting,
    jobName,
    offset,
    appId,
    jobId,
    createdStart,
    createdEnd,
    lastrunStart,
    lastrunEnd,
    finishedStart,
    finishedEnd,
    updatedStart,
    updatedEnd
  ]);

  return state;
};

export default useResultsTableFetch;
