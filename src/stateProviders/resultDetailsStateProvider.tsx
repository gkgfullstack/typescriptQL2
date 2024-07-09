import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
//import ProductInfo from 'src/types/ProductInfo';
import SearchDtlListInfo from 'src/types/SearchDtlListInfo';
import Schedule from 'src/types/Schedule';
import SearchDtlSummary from 'src/types/SearchDtlSummary';

enum SEARCH_DETAILS_ACTION_TYPES {
  setRunId = 'SET_SEARCH_ID',
  setSeachDtl = 'SET_SEARCH_DTL',
  removeSearchDtl = 'REMOVE_SEARCHDTL',
  removeSchedule = 'REMOVE_SCHEDULE',
  setSeachDtlSummary = 'SET_SEARCH_DTLSUMMARY',
  deleteds= 'DELETEDS',  
}

export type SearchDetailsState = {
  removeSearchDtl: SearchDtlListInfo[];
  removeSchedule:Schedule[];
  runId: string;
  deleted: boolean;
  deleteds: boolean;
  searchDtl: SearchDtlListInfo | undefined;
  seachDtlSummary:SearchDtlSummary|undefined
};

export type SearchDetailsAction = {
  type: SEARCH_DETAILS_ACTION_TYPES;
  payload: SearchDetailsState;
};

export const defaultState: SearchDetailsState = {
  removeSearchDtl: [],
  removeSchedule:[],
  runId: '',
  deleted:false,
  deleteds:false,
  searchDtl: undefined,
  seachDtlSummary:undefined,
  
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
      case SEARCH_DETAILS_ACTION_TYPES.setRunId: {
        const { runId } = action.payload;
        draft.runId = runId || '';
        draft.searchDtl = undefined;

        return draft;
      }
      case SEARCH_DETAILS_ACTION_TYPES.removeSearchDtl: {
        const { removeSearchDtl,deleted } = action.payload;

        draft.removeSearchDtl = removeSearchDtl
        draft.deleted=deleted
        return draft;
      }
      case SEARCH_DETAILS_ACTION_TYPES.removeSchedule: {
        const { removeSchedule,deleteds } = action.payload;

        draft.removeSchedule =removeSchedule
          draft.deleteds=deleteds;
        return draft;
      }
      case SEARCH_DETAILS_ACTION_TYPES.setSeachDtlSummary: {
        const {seachDtlSummary } = action.payload;
        draft.seachDtlSummary = seachDtlSummary ? { ...seachDtlSummary } : undefined;
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
