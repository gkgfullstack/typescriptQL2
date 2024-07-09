import { useEffect, useReducer } from 'react';
import { getResultlist, ResultlistResponse } from 'src/api/tableResultlist';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';


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
  appId: '130',
  createdStart:'',
  createdEnd:'',
  lastrunStart:'',
  lastrunEnd:'',
  finishedStart:'',
  finishedEnd:'',
  updatedStart:'',
  updatedEnd:'',
  searchFilterConditionGet: '',
  isPageType: 'All',
  errorMsg:'',
};

const useResultsTableFetch = (
  initialSorting: any,
  initialPage: any,
  initialSize: any,
  initialAppId: any,
  jobName: any,
  initialIsPageType: any,
  createdStart:any,
  createdEnd:any,
  lastrunStart:any,
  lastrunEnd:any,
  finishedStart:any,
  finishedEnd:any,
  updatedStart:any,
  updatedEnd:any,
  
): ResultsTableListState => {
  const [state, dispatch] = useReducer(
    (state: ResultsTableListState, action: ResultsTableListAction) => {
      const fetchState: ResultsTableListState = fetchReducer(state, action) as ResultsTableListState;
      return resultsTableListReducer({ ...fetchState }, action);
    },
    {
      ...initialState,
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
      isPageType: initialIsPageType,
    }
  );
  let { offset, page, size, sorting, appId, isPageType} = state;

  useEffect(() => {
    if (initialSorting && initialSize && initialPage) {
      dispatch({
        type: RT_LIST_ACTION_TYPES.updateOptions,
        payload: {
          sorting: initialSorting,
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
          isPageType: initialIsPageType,
        },
      });
    }
  }, [
    initialSorting,
    initialSize,
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
    initialIsPageType,
    ]);
  useEffect(() => {
    const fetch = async () => {
      if (dispatch && createdStart !== undefined) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          isPageType = isPageType === undefined ? "All" : isPageType
          if(localStorage.getItem("isPageType")!==undefined){
            let pagetype=localStorage.getItem("isPageType");
            if(pagetype!=='undefined' && pagetype !== isPageType){
              offset = 0;
            }
          }
          const { resultList: data, totalRecords ,errorMsg}: ResultlistResponse = await getResultlist(
            offset,
            size,
            sorting,
            appId,
            jobName,
            createdStart,
            createdEnd,
            lastrunStart,
            lastrunEnd,
            finishedStart,
            finishedEnd,
            updatedStart,
            updatedEnd,
            isPageType,
          );
          if(isPageType!== undefined)
          localStorage.setItem("isPageType",String(isPageType));
          else
          localStorage.setItem("isPageType",String("All"));
          if(offset<=1 ){
           
            localStorage.setItem("totalRecordsJobs",String(totalRecords));
          }
          dispatch({
            type: RT_LIST_ACTION_TYPES.setResultsTable,
            payload: { data: [...data], total: Number(totalRecords===undefined ? 0:totalRecords),errorMsg : errorMsg },
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
    createdStart,
    createdEnd,
    lastrunStart,
    lastrunEnd,
    finishedStart,
    finishedEnd,
    updatedStart,
    updatedEnd,
    isPageType,
  ]);

  return state;
};

export default useResultsTableFetch;
