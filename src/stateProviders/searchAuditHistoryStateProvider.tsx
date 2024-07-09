import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';

enum SEARCH_AUDITHISTORY_ACTION_TYPES {
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

export type SearchAuditHistoryState = {
  searchValue?: string;
  advancedFilters: Filters;
};

export type SearchAuditHistoryAction = {
  type: SEARCH_AUDITHISTORY_ACTION_TYPES;
  payload: SearchAuditHistoryState | Filters;
};

export const defaultState: SearchAuditHistoryState = {
  advancedFilters: {
    isOpen: false,
    brands: [],
    offset: 1,
    size: 10,
  },
  searchValue: '',
};

const DispatchContext: Context<Dispatch<SearchAuditHistoryAction>> = React.createContext<
  Dispatch<SearchAuditHistoryAction>
>({} as Dispatch<SearchAuditHistoryAction>);
const StateContext: Context<Partial<SearchAuditHistoryState>> = React.createContext<Partial<SearchAuditHistoryState>>(
  {}
);

export const reducer = (state: SearchAuditHistoryState, action: SearchAuditHistoryAction): SearchAuditHistoryState =>
  produce(state, (draft: SearchAuditHistoryState) => {
    switch (action.type) {
      case SEARCH_AUDITHISTORY_ACTION_TYPES.setSearchFilters: {
        const property = action.payload;
        draft.advancedFilters = property ? { ...draft.advancedFilters, ...property } : defaultState.advancedFilters;
        return draft;
      }
      case SEARCH_AUDITHISTORY_ACTION_TYPES.setSearchValue: {
        const { searchValue } = action.payload as SearchAuditHistoryState;
        draft.searchValue = searchValue || defaultState.searchValue;

        return draft;
      }
      case SEARCH_AUDITHISTORY_ACTION_TYPES.removeSearchValue: {
        draft.searchValue = '';

        return draft;
      }
      case SEARCH_AUDITHISTORY_ACTION_TYPES.removeSearchFilters: {
        draft.advancedFilters = defaultState.advancedFilters;

        return draft;
      }
      case SEARCH_AUDITHISTORY_ACTION_TYPES.cleanupSearchPanelState: {
        draft.advancedFilters = defaultState.advancedFilters;
        draft.searchValue = defaultState.searchValue;

        return draft;
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  });

export const DispatchAuditHistoryDetailsProvider = DispatchContext.Provider;
export const AuditHistoryDetailsStateContextProvider = StateContext.Provider;
type SearchPanelStateProviderProps = {
  children: React.ReactNode;
};

const SearchAuditHistoryStateProvider: React.FC<SearchPanelStateProviderProps> = ({
  children,
}: SearchPanelStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchAuditHistoryDetailsProvider value={dispatch}>
      <AuditHistoryDetailsStateContextProvider value={state}>{children}</AuditHistoryDetailsStateContextProvider>
    </DispatchAuditHistoryDetailsProvider>
  );
};

export { SearchAuditHistoryStateProvider, DispatchContext, StateContext, SEARCH_AUDITHISTORY_ACTION_TYPES };
