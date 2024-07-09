import produce from 'immer';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';
import { Action, FetchState } from 'src/reducers/fetchReducer';
import { Sorting } from '../../../types/Sorting';
import  CreateJobPropertiesTypePost  from 'src/types/CreateJobPropertiesTypePost';

export enum SEARCHDTL_ACTION_TYPES {  
  updateOptions = 'UPDATE_OPTIONS',
  removeMatches = 'REMOVE_MATCHES',
  setSetting='SET_SETTING',
  setPostSetting= 'SETPOST_SETTING'
}

export type SearchDtlState = FetchState<Array<SearchDtlListInfo>> & {
  total: number;  
  sorting: Sorting<SearchDtlListInfo> | null;
  getSetting:any;
  postSetting:any;
};


export type UpdateOptionsAction = {
  type: SEARCHDTL_ACTION_TYPES.updateOptions;
  payload: Pick<SearchDtlState, 'sorting' >;
};


export type SetSupportHelpAction = {
  type: SEARCHDTL_ACTION_TYPES.setSetting;
  payload: { getSetting: CreateJobPropertiesTypePost };
};

export type SetPostSupportHelpAction = {
  type: SEARCHDTL_ACTION_TYPES.setPostSetting;
  payload: { postSetting: CreateJobPropertiesTypePost };
};

export type SearcheDtlAction =
  | Action<Array<SearchDtlListInfo>>
  | UpdateOptionsAction
  | SetSupportHelpAction
  | SetPostSupportHelpAction
  

export const settingsReducer = (state: SearchDtlState, action: SearcheDtlAction): SearchDtlState =>
  produce(state, (draft: SearchDtlState) => {
    switch (action.type) {
       
      case SEARCHDTL_ACTION_TYPES.updateOptions: {
        const { sorting } = action.payload;
        if (JSON.stringify(sorting) !== JSON.stringify(draft.sorting)) {
          draft.sorting = sorting;
        }
        return draft;
      }
      case SEARCHDTL_ACTION_TYPES.setSetting: {
        const { getSetting } = action.payload;
        draft.getSetting = getSetting; 
          draft.getSetting = getSetting;
        
        return draft;
      } 
      case SEARCHDTL_ACTION_TYPES.setPostSetting: {
        const { postSetting } = action.payload;        
        draft.postSetting = postSetting;      
         draft.postSetting = postSetting;
        
        return draft;
      }
      default: {
        return draft;
      }
    }
  });
