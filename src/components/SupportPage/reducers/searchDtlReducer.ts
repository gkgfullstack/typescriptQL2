import produce from 'immer';
import SupportHelpTypePost from 'src/types/SupportHelpTypePost';
import { Action, FetchState } from 'src/reducers/fetchReducer';
//import { Sorting } from '../../../types/Sorting';
import  CreateJobPropertiesTypePost  from 'src/types/CreateJobPropertiesTypePost';
import { Sorting } from 'src/types/Sorting';

export enum SEARCHDTL_ACTION_TYPES {  
  updateOptions = 'UPDATE_OPTIONS',
  removeMatches = 'REMOVE_MATCHES',
  setSupportHelp='SET_SUPPORT',
  setPostSupportHelp= 'SETPOST_SUPPORT'
}

export type SearchDtlState = FetchState<Array<SupportHelpTypePost>> & {
  total: number;  
  sorting: Sorting<SupportHelpTypePost> | null;
  getSupportHelp:any;
  postSupportHelp:any;
};


export type UpdateOptionsAction = {
  type: SEARCHDTL_ACTION_TYPES.updateOptions;
  payload: Pick<SearchDtlState, 'sorting' >;
};


export type SetSupportHelpAction = {
  type: SEARCHDTL_ACTION_TYPES.setSupportHelp;
  payload: { getSupportHelp: CreateJobPropertiesTypePost };
};

export type SetPostSupportHelpAction = {
  type: SEARCHDTL_ACTION_TYPES.setPostSupportHelp;
  payload: { postSupportHelp: CreateJobPropertiesTypePost };
};

export type SearcheDtlAction =
  | Action<Array<SupportHelpTypePost>>
  | UpdateOptionsAction
  | SetSupportHelpAction
  | SetPostSupportHelpAction
  

export const searchDtlReducer = (state: SearchDtlState, action: SearcheDtlAction): SearchDtlState =>
  produce(state, (draft: SearchDtlState) => {
    switch (action.type) {
       
      case SEARCHDTL_ACTION_TYPES.updateOptions: {
        const { sorting } = action.payload;
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
        }
        return draft;
      }
      case SEARCHDTL_ACTION_TYPES.setSupportHelp: {
        const { getSupportHelp } = action.payload;
        draft.getSupportHelp = getSupportHelp; 
          draft.getSupportHelp = getSupportHelp;
        
        return draft;
      } 
      case SEARCHDTL_ACTION_TYPES.setPostSupportHelp: {
        const { postSupportHelp } = action.payload;        
        draft.postSupportHelp = postSupportHelp;      
         draft.postSupportHelp = postSupportHelp;
        
        return draft;
      }
      default: {
        return draft;
      }
    }
  });
