import produce from 'immer';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from '../../../types/Sorting';
import  CreateJobPropertiesTypePost  from 'src/types/CreateJobPropertiesTypePost';

export enum SEARCHDTL_ACTION_TYPES {  
  updateOptions = 'UPDATE_OPTIONS',
  removeMatches = 'REMOVE_MATCHES',
  addMatches = 'ADD_MATCHES',
  setSearchDtl='SET_SEARCHDTL',
  setJobProperties='SET_JOBPROPERTIES',
  setPostJobProperties= 'SETPOST_JOBPROPERTIES'
}

export type SearchDtlState = FetchState<Array<SearchDtlListInfo>> & {
  total: number;  
  sorting: Sorting<SearchDtlListInfo> | null;
  getJobProperties:any;
  postJobProperties:any;
};


export type UpdateOptionsAction = {
  type: SEARCHDTL_ACTION_TYPES.updateOptions;
  payload: Pick<SearchDtlState, 'sorting' >;
};

export type SetSearchDtlAction = {
  type: SEARCHDTL_ACTION_TYPES.setSearchDtl;
  payload: Pick<SearchDtlState, 'data' | 'total'>;
};

export type SetJobPropertiesAction = {
  type: SEARCHDTL_ACTION_TYPES.setJobProperties;
  payload: { getJobProperties: CreateJobPropertiesTypePost };
};

export type SetPostJobPropertiesAction = {
  type: SEARCHDTL_ACTION_TYPES.setPostJobProperties;
  payload: { postJobProperties: CreateJobPropertiesTypePost };
};

export type SearcheDtlAction =
  | Action<Array<SearchDtlListInfo>>
  | UpdateOptionsAction
  | SetSearchDtlAction
  | SetJobPropertiesAction
  | SetPostJobPropertiesAction
  

export const searchDtlReducer = (state: SearchDtlState, action: SearcheDtlAction): SearchDtlState =>
  produce(state, (draft: SearchDtlState) => {
    switch (action.type) {
      case SEARCHDTL_ACTION_TYPES.setSearchDtl: {
        const { data, total } = action.payload;
        draft.loading = false;
        draft.error = false;
        draft.total = total;
        if (data) {
          draft.data = data;
        }
       
        return draft;
      }  
 
      case SEARCHDTL_ACTION_TYPES.updateOptions: {
        const { sorting } = action.payload;
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
        }
        return draft;
      }
      case SEARCHDTL_ACTION_TYPES.setJobProperties: {
        const { getJobProperties } = action.payload;
        draft.getJobProperties = getJobProperties; 
          draft.getJobProperties = getJobProperties;
        
        return draft;
      } 
      case SEARCHDTL_ACTION_TYPES.setPostJobProperties: {
        const { postJobProperties } = action.payload;
        console.log('postJobProperties=====', postJobProperties)
        
        draft.postJobProperties = postJobProperties;      
         draft.postJobProperties = postJobProperties;
        
        return draft;
      }
      default: {
        return draft;
      }
    }
  });
