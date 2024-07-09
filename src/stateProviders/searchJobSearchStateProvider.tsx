import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';

enum SEARCH_JOBSEARCH_ACTION_TYPES {
  setSearchValue = 'SET_SEARCH_VALUE',
  setSearchFilters = 'SET_SEARCH_FILTERS',
  removeSearchValue = 'REMOVE_SEARCH_VALUE',
  removeSearchFilters = 'REMOVE_SEARCH_FILTERS',
  cleanupSearchPanelState = 'CLEAN_UP_SEARCH_PANEL_STATE',
}

export type Filters = {
  brands?: string[];
  isOpen: boolean;
  offset: number;
  size: number;
};

export type SearchJobSearchState = {
  searchValue?: string;
  advancedFilters: Filters;
  matchTypeFilter:string;
  region:string;
  priceType:string;
};

export type SearchJobSearchAction = {
  type: SEARCH_JOBSEARCH_ACTION_TYPES;
  payload: SearchJobSearchState | Filters;
};

export const defaultState: SearchJobSearchState = {
  advancedFilters: {
    isOpen: false,
    brands: [],
    offset: 1,
    size: 10,
  },
  searchValue: '',
  matchTypeFilter: "ALL",
  region: "-1",
  priceType:"1",
};

const DispatchContext: Context<Dispatch<SearchJobSearchAction>> = React.createContext<Dispatch<SearchJobSearchAction>>(
  {} as Dispatch<SearchJobSearchAction>
);
const StateContext: Context<Partial<SearchJobSearchState>> = React.createContext<Partial<SearchJobSearchState>>({});

export const reducer = (state: SearchJobSearchState, action: SearchJobSearchAction): SearchJobSearchState =>
  produce(state, (draft: SearchJobSearchState) => {
    switch (action.type) {
      case SEARCH_JOBSEARCH_ACTION_TYPES.setSearchFilters: {
        const property = action.payload;
        draft.advancedFilters = property ? { ...draft.advancedFilters, ...property } : defaultState.advancedFilters;
        return draft;
      }
      case SEARCH_JOBSEARCH_ACTION_TYPES.setSearchValue: {
        const { searchValue, matchTypeFilter , region, priceType} = action.payload as SearchJobSearchState;
        draft.searchValue = searchValue || defaultState.searchValue;
        draft.matchTypeFilter = matchTypeFilter || defaultState.matchTypeFilter;
        draft.region = region || defaultState.region;
        draft.priceType = priceType || defaultState.priceType;

        return draft;
      }
      case SEARCH_JOBSEARCH_ACTION_TYPES.removeSearchValue: {
        draft.searchValue = '';
        draft.matchTypeFilter = "ALL";
        draft.region = "-1";
        draft.priceType = "1";
        return draft;
      }
      case SEARCH_JOBSEARCH_ACTION_TYPES.removeSearchFilters: {
        draft.advancedFilters = defaultState.advancedFilters;
        draft.matchTypeFilter = defaultState.matchTypeFilter;
        draft.region = defaultState.region;
        draft.priceType = defaultState.priceType;

        return draft;
      }
      case SEARCH_JOBSEARCH_ACTION_TYPES.cleanupSearchPanelState: {
        draft.advancedFilters = defaultState.advancedFilters;
        draft.matchTypeFilter = defaultState.matchTypeFilter;
        draft.region = defaultState.region;
        draft.priceType = defaultState.priceType;
        draft.searchValue = defaultState.searchValue;

        return draft;
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  });

export const DispatchJobSearchDetailsProvider = DispatchContext.Provider;
export const JobSearchDetailsStateContextProvider = StateContext.Provider;
type SearchPanelStateProviderProps = {
  children: React.ReactNode;
};

const SearchJobSearchStateProvider: React.FC<SearchPanelStateProviderProps> = ({
  children,
}: SearchPanelStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchJobSearchDetailsProvider value={dispatch}>
      <JobSearchDetailsStateContextProvider value={state}>{children}</JobSearchDetailsStateContextProvider>
    </DispatchJobSearchDetailsProvider>
  );
};

export { SearchJobSearchStateProvider, DispatchContext, StateContext, SEARCH_JOBSEARCH_ACTION_TYPES };
