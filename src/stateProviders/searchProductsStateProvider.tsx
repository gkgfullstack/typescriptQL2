import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
//import ApplicationFilterType from 'src/types/ApplicationFilterType';

enum SEARCH_PRODUCTS_ACTION_TYPES {
  setSearchValue = 'SET_SEARCH_VALUE',
  setSearchFilters = 'SET_SEARCH_FILTERS',
  setRegionFilters = 'SET_SEARCH_FILTERS',
  removeSearchValue = 'REMOVE_SEARCH_VALUE',
  removeSearchFilters = 'REMOVE_SEARCH_FILTERS',
  cleanupSearchPanelState = 'CLEAN_UP_SEARCH_PANEL_STATE',
  setAppIdData = 'SET_APPID_DATA',                 
}

export type Filters = {
  brands?: string[];
  isOpen: boolean;
  offset: number;
  size: number;
};

export type FiltersVertical = {
  brands?: string[];
  isOpen: boolean;
};

export type SearchProductsState = {
  searchValue?: string;
  advancedFilters: Filters;
  customFilterList: Filters;
  matchTypeFilter:string;
  region:string;
  priceType:string;
  vertical:FiltersVertical;
};

export type SearchProductsAction = {
  type: SEARCH_PRODUCTS_ACTION_TYPES;
  payload: SearchProductsState | Filters | FiltersVertical;
};


export const defaultState: SearchProductsState = {
  advancedFilters: {
    isOpen: false,
    brands: [],
    offset: 1,
    size: 10,
  },
  customFilterList: {
    isOpen: false,
    brands: [],
    offset: 1,
    size: 10,
  },
  matchTypeFilter: "ALL",
  region: "-1",
  priceType: "1",
  searchValue: '',
  vertical:{
    isOpen: false,
    brands: [],
  },
};

const DispatchContext: Context<Dispatch<SearchProductsAction>> = React.createContext<Dispatch<SearchProductsAction>>(
  {} as Dispatch<SearchProductsAction>
);
const StateContext: Context<Partial<SearchProductsState>> = React.createContext<Partial<SearchProductsState>>({});

export const reducer = (state: SearchProductsState, action: SearchProductsAction): SearchProductsState =>
  produce(state, (draft: SearchProductsState) => {
    switch (action.type) {
      case SEARCH_PRODUCTS_ACTION_TYPES.setSearchFilters: {
        const property = action.payload;
        draft.advancedFilters = property ? { ...draft.advancedFilters, ...property } : defaultState.advancedFilters;
        draft.customFilterList = property ? { ...draft.customFilterList, ...property } : defaultState.customFilterList;
        draft.vertical = property ? { ...draft.vertical, ...property } : defaultState.vertical;
        console.log('searchProductsStateProvider.tsx======searchProductsStateProvider.tsx======draft.vertical====', draft.vertical)
        
        return draft;
      }
      case SEARCH_PRODUCTS_ACTION_TYPES.setRegionFilters: {
        const { region } = action.payload as SearchProductsState;
        draft.region = region || defaultState.region;
        return draft;
      }
      case SEARCH_PRODUCTS_ACTION_TYPES.setAppIdData: {
        const { vertical } = action.payload as SearchProductsState;
        draft.vertical = vertical || defaultState.vertical;
        return draft;
      }
      case SEARCH_PRODUCTS_ACTION_TYPES.setSearchValue: {
        const { searchValue, region, matchTypeFilter, priceType } = action.payload as SearchProductsState;
        draft.searchValue = searchValue || defaultState.searchValue;
        draft.region = region || defaultState.region;
        draft.matchTypeFilter = matchTypeFilter || defaultState.matchTypeFilter;
        draft.priceType = priceType || defaultState.priceType;

        return draft;
      }

      case SEARCH_PRODUCTS_ACTION_TYPES.removeSearchValue: {
        draft.searchValue = '';

        return draft;
      }
      case SEARCH_PRODUCTS_ACTION_TYPES.removeSearchFilters: {
        draft.advancedFilters = defaultState.advancedFilters;
        draft.customFilterList = defaultState.customFilterList;
        draft.vertical = defaultState.vertical;
        draft.matchTypeFilter = defaultState.matchTypeFilter;
        draft.region = defaultState.region;
        draft.priceType = defaultState.priceType;

        return draft;
      }
      case SEARCH_PRODUCTS_ACTION_TYPES.cleanupSearchPanelState: {
        draft.advancedFilters = defaultState.advancedFilters;
        draft.customFilterList = defaultState.customFilterList;
        draft.vertical = defaultState.vertical;        
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

export const DispatchProductDetailsProvider = DispatchContext.Provider;
export const ProductDetailsStateContextProvider = StateContext.Provider;
type SearchPanelStateProviderProps = {
  children: React.ReactNode;
};

const SearchProductsStateProvider: React.FC<SearchPanelStateProviderProps> = ({
  children,
}: SearchPanelStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchProductDetailsProvider value={dispatch}>
      <ProductDetailsStateContextProvider value={state}>{children}</ProductDetailsStateContextProvider>
    </DispatchProductDetailsProvider>
  );
};

export { SearchProductsStateProvider, DispatchContext, StateContext, SEARCH_PRODUCTS_ACTION_TYPES };
