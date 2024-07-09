import { useEffect, useReducer } from 'react';
import { getJobSearchListSearch, SearchFilterConditionss } from 'src/api/jobSearch';
import { FETCH_ACTION_TYPES, fetchReducer } from 'src/reducers/fetchReducer';
import JobSearchInfo from 'src/types/JobSearchInfo';
import { Sorting } from 'src/types/Sorting';
import {
  JOBSEARCH_LIST_ACTION_TYPES,
  JobSearchListAction,
  jobSearchListReducer,
  JobSearchListState,
} from '../reducers/jobSearchListReducer';

const initialState: JobSearchListState = {
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
  isPageLoad:0,
  ownerName:'',
  bAdminMode:false
};

const useJobSearchListFetch = (
  initialSorting: Sorting<JobSearchInfo>,
  initialPage: number,
  initialSize: number,
  initialAppId: number,
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
  initialIsPageLoad:any,
  ownerName:any,
  bAdminMode:boolean
  
): JobSearchListState => {
  const [state, dispatch] = useReducer(
    (state: JobSearchListState, action: JobSearchListAction) => {
      const fetchState: JobSearchListState = fetchReducer(state, action) as JobSearchListState;
      return jobSearchListReducer({ ...fetchState }, action);
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
      isPageLoad:initialIsPageLoad,
      ownerName,
      bAdminMode
    }
  );
  let { offset, page, size, sorting, appId, isPageType,isPageLoad} = state;
  
  useEffect(() => {
    if (initialSorting && initialSize && initialPage) {
      dispatch({
        type: JOBSEARCH_LIST_ACTION_TYPES.updateOptions,
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
          isPageLoad:initialIsPageLoad,
          ownerName,
          bAdminMode
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
    initialIsPageLoad,
    ownerName,
    bAdminMode
    ]);

  useEffect(() => {
    const fetch = async () => {
      if (dispatch) {
        dispatch({ type: FETCH_ACTION_TYPES.loading, payload: { loading: true } });
        try {
          isPageType = isPageType === undefined ? "All" : isPageType
          if(localStorage.getItem("isPageType")!==undefined){
            let pagetype=localStorage.getItem("isPageType");
            if(pagetype!=='undefined' && pagetype !== isPageType){
              offset = offset;
            }
          }
          const { jobList: data, totalRecords }: SearchFilterConditionss = await getJobSearchListSearch(
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
            isPageLoad,
            ownerName,
            bAdminMode
            
          );
          if(isPageType!== undefined)
          localStorage.setItem("isPageType",String(isPageType));
        
          else
          localStorage.setItem("isPageType",String("All"));
          if(offset<=1){
           
            localStorage.setItem("totalRecordsJobs",String(totalRecords));
          }
          dispatch({
            type: JOBSEARCH_LIST_ACTION_TYPES.setJobSearch,
            payload: { data: [...data], total: Number(totalRecords) },
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
    isPageLoad,
    ownerName,
    bAdminMode
  ]);

  return state;
};

export default useJobSearchListFetch;
