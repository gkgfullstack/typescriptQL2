import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';
import Schedule from 'src/types/Schedule';
import SearchDtlSummary from 'src/types/SearchDtlSummary';
import CreateJobPropertiesTypePost from 'src/types/CreateJobPropertiesTypePost';
import SettingTypePost from 'src/types/SettingTypePost';
//import SupportHelpTypePost from 'src/types/SupportHelpTypePost';

enum SEARCH_DETAILS_ACTION_TYPES {
  setSearchId = 'SET_SEARCH_ID',
  setSeachDtl = 'SET_SEARCH_DTL',
  removeSearchDtl = 'REMOVE_SEARCHDTL',
  removeSchedule = 'REMOVE_SCHEDULE',
  setSeachDtlSummary = 'SET_SEARCH_DTLSUMMARY',
  deleteds= 'DELETEDS',
  addScheduleJob = 'ADD_SCHEDULE',
  setJobProperties = 'SET_JOBPROPERTIES',   
  setPostJobProperties = 'SETPOST_JOBPROPERTIES', 
  setPostSupportHelp = 'SETPOST_SUPPORTHELP',  
  setSettingsPost = 'SETTING_POST',
}

export type SearchDetailsState = {
  removeSearchDtl: SearchDtlListInfo[];
  removeSchedule:Schedule[];
  addScheduleJob:Schedule[];
  searchId: string;
  deleted: boolean;
  deleteds: boolean;
  searchDtl: SearchDtlListInfo | undefined;
  seachDtlSummary:SearchDtlSummary|undefined
  addSched: boolean;
  adddtl: boolean;
  jobPropertyUpdate:boolean | undefined;  
  getJobProperties:CreateJobPropertiesTypePost | undefined;
  postJobProperties:CreateJobPropertiesTypePost | undefined;
  postSupportHelp: boolean | undefined;
  settingsUpdate:SettingTypePost | undefined;
  settingsUpdated:boolean | undefined;
};

export type SearchDetailsAction = {
  type: SEARCH_DETAILS_ACTION_TYPES;
  payload: SearchDetailsState;
};

export const defaultState: SearchDetailsState = {
  removeSearchDtl: [],
  removeSchedule:[],
  searchId: '',
  deleted:false,
  deleteds:false,
  searchDtl: undefined,
  seachDtlSummary:undefined,
  addScheduleJob:[],
  addSched:false,
  adddtl:false,
  jobPropertyUpdate:false,  
  getJobProperties:undefined,
  postJobProperties:undefined,
  postSupportHelp:false,
  settingsUpdate:undefined,
  settingsUpdated:false,
};

const DispatchContext: Context<Dispatch<SearchDetailsAction>> = React.createContext<Dispatch<SearchDetailsAction>>(
  {} as Dispatch<SearchDetailsAction>
);
const StateContext: Context<Partial<SearchDetailsState>> = React.createContext<Partial<SearchDetailsState>>({});

export const reducer = (state: SearchDetailsState, action: SearchDetailsAction): SearchDetailsState =>
  produce(state, (draft: SearchDetailsState) => {
    switch (action.type) {
      case SEARCH_DETAILS_ACTION_TYPES.setSeachDtl: {
        const { searchDtl } = action.payload;
        draft.searchDtl = searchDtl ? { ...searchDtl } : undefined;
        return draft;
      }
      case SEARCH_DETAILS_ACTION_TYPES.setSearchId: {
        const { searchId } = action.payload;
        draft.searchId = searchId || '';
        draft.searchDtl = undefined;

        return draft;
      }
      case SEARCH_DETAILS_ACTION_TYPES.removeSearchDtl: {
        const { removeSearchDtl,deleted,adddtl } = action.payload;

        draft.removeSearchDtl = removeSearchDtl
        draft.deleted=deleted
        draft.adddtl=adddtl;
        return draft;
      }
      case SEARCH_DETAILS_ACTION_TYPES.removeSchedule: {
        const { removeSchedule,deleteds } = action.payload;

        draft.removeSchedule =removeSchedule
          draft.deleteds=deleteds;
          draft.addSched=false;
        return draft;
      }
      case SEARCH_DETAILS_ACTION_TYPES.addScheduleJob: {
        const { addScheduleJob,addSched} = action.payload;
        draft.addScheduleJob =addScheduleJob
          draft.addSched=addSched;
          draft.deleteds=false;
        return draft;
      }
      case SEARCH_DETAILS_ACTION_TYPES.setSeachDtlSummary: {
        const {seachDtlSummary,adddtl } = action.payload;
        draft.seachDtlSummary = seachDtlSummary ? { ...seachDtlSummary } : undefined;
        draft.adddtl=adddtl;
        return draft;
      }
      // case SEARCH_DETAILS_ACTION_TYPES.setJobProperties: {
      //   const {jobPropertyUpdate } = action.payload;
      //   draft.jobPropertyUpdate = jobPropertyUpdate;
      //   return draft;
      // }
      case SEARCH_DETAILS_ACTION_TYPES.setJobProperties: {
        const {jobPropertyUpdate } = action.payload;
        draft.jobPropertyUpdate = jobPropertyUpdate ? jobPropertyUpdate  : undefined;
        draft.jobPropertyUpdate=jobPropertyUpdate;
        return draft;
      }
      
      case SEARCH_DETAILS_ACTION_TYPES.setPostJobProperties: {
        const {postJobProperties } = action.payload;
        draft.postJobProperties = postJobProperties ? { ...postJobProperties } : undefined;
        draft.postJobProperties=postJobProperties;
        return draft;
      }
      case SEARCH_DETAILS_ACTION_TYPES.setSettingsPost: {
        const {settingsUpdated } = action.payload;
        draft.settingsUpdated = settingsUpdated ? settingsUpdated  : undefined;
        draft.settingsUpdated=settingsUpdated;
        return draft;
      }

      case SEARCH_DETAILS_ACTION_TYPES.setPostSupportHelp: {
        const {postSupportHelp } = action.payload;
        draft.postSupportHelp = postSupportHelp;
        draft.postSupportHelp=postSupportHelp;
        return draft;
      }
     
      case SEARCH_DETAILS_ACTION_TYPES.deleteds: {
        const {deleteds } = action.payload;
       draft.deleteds=deleteds;
        return draft;
      }
 
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  });

export const DispatchSearchDetailsProvider = DispatchContext.Provider;
export const SearchDetailsStateContextProvider = StateContext.Provider;
type SearchDetailsStateProviderProps = {
  children: React.ReactNode;
};

const SearchDetailsStateProvider: React.FC<SearchDetailsStateProviderProps> = ({
  children,
}: SearchDetailsStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchSearchDetailsProvider value={dispatch}>
      <SearchDetailsStateContextProvider value={state}>{children}</SearchDetailsStateContextProvider>
    </DispatchSearchDetailsProvider>
  );
};

export { SearchDetailsStateProvider, DispatchContext, StateContext, SEARCH_DETAILS_ACTION_TYPES };
