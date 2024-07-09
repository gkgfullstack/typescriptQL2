import {
  defaultState,
  SEARCH_PRODUCTS_ACTION_TYPES,
  SearchProductsState,
  SearchProductsStateProvider,
  Filters,
  reducer,
} from './searchProductsStateProvider';
import { shallow } from 'enzyme';
import * as React from 'react';

const state: SearchProductsState = {
  searchValue: '',
  advancedFilters: {
    isOpen: false,
    offset: 1,
    size: 10,
  },
};

describe('SearchProductsStateProvider provider ', () => {
  it('renders SearchProductsStateProvider component without crashing', () => {
    const wrapper = shallow(<SearchProductsStateProvider>Child</SearchProductsStateProvider>);
    expect(wrapper.find('ContextProvider')).toHaveLength(2);
    expect(
      wrapper
        .find('ContextProvider')
        .at(1)
        .prop('value')
    ).toEqual(defaultState);
    const dispatch = wrapper
      .find('ContextProvider')
      .at(0)
      .prop('value');
    expect(dispatch).toBeDefined();
  });
  it('updates state searchValue to new searchValue value when setSearchValue action fires', () => {
    const searchPanelState: SearchProductsState = reducer(
      { ...state, searchValue: 'default value' },
      {
        type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchValue,
        payload: { searchValue: 'input search value' } as SearchProductsState,
      }
    );
    expect(searchPanelState.searchValue).toEqual('input search value');
  });
  it('calls default state searchValue when setSearchValue action fires', () => {
    const searchPanelState: SearchProductsState = reducer(state, {
      type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchValue,
      payload: {} as SearchProductsState,
    });
    expect(searchPanelState.searchValue).toEqual(defaultState.searchValue);
  });
  it('updates state searchValue to new searchValue value when setSearchValue action fires and remove new searchValue value when removeSearchValue fires', () => {
    const updateSearchPanelState: SearchProductsState = reducer(
      { ...state, searchValue: 'default value' },
      {
        type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchValue,
        payload: { searchValue: 'updating search value' } as SearchProductsState,
      }
    );
    expect(updateSearchPanelState.searchValue).toEqual('updating search value');
    const removeSearchPanelState: SearchProductsState = reducer(state, {
      type: SEARCH_PRODUCTS_ACTION_TYPES.removeSearchValue,
      payload: {} as SearchProductsState,
    });
    expect(removeSearchPanelState.searchValue).toEqual('');
  });
  it('calls default state advancedFilters when setSearchFilters action fires', () => {
    const searchPanelState: SearchProductsState = reducer(state, {
      type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchValue,
      payload: {} as SearchProductsState,
    });
    expect(searchPanelState.searchValue).toEqual('');
  });
  it('updates state advancedFilters to new advancedFilters value when setSearchFilters action fires', () => {
    const searchPanelState: SearchProductsState = reducer(
      { ...state, advancedFilters: { ...state.advancedFilters, offset: 10 } },
      {
        type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchFilters,
        payload: { offset: 10, size: 10 } as Filters,
      }
    );
    expect(searchPanelState.advancedFilters).toEqual({ isOpen: false, offset: 10, size: 10 });
  });
  it('updates state advancedFilters to new advancedFilters value when setSearchFilters action fires and remove new advancedFilters value when removeSearchFilters fires', () => {
    const updateSearchPanelState: SearchProductsState = reducer(
      { ...state, advancedFilters: { ...state.advancedFilters, offset: 10 } },
      {
        type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchFilters,
        payload: { offset: 10, size: 10 } as Filters,
      }
    );
    expect(updateSearchPanelState.advancedFilters).toEqual({ isOpen: false, offset: 10, size: 10 });
    const removeSearchPanelState: SearchProductsState = reducer(state, {
      type: SEARCH_PRODUCTS_ACTION_TYPES.removeSearchFilters,
      payload: {} as SearchProductsState,
    });
    expect(removeSearchPanelState.advancedFilters).toEqual(defaultState.advancedFilters);
  });
  it('updates state searchValue and advancedFilters values when setSearchFilters and setSearchValue action fires and cleans up state of Search Panel when cleanupSearchPanelState action fires', () => {
    const updateSearchValueState: SearchProductsState = reducer(state, {
      type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchValue,
      payload: { searchValue: 'updating search value' } as SearchProductsState,
    });
    const updateSearchFiltersState: SearchProductsState = reducer(state, {
      type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchFilters,
      payload: { offset: 10, size: 10 } as Filters,
    });
    expect(updateSearchValueState.searchValue).toEqual('updating search value');
    expect(updateSearchFiltersState.advancedFilters).toEqual({ isOpen: false, offset: 10, size: 10 });
    const cleanupSearchPanelState: SearchProductsState = reducer(state, {
      type: SEARCH_PRODUCTS_ACTION_TYPES.cleanupSearchPanelState,
      payload: {} as SearchProductsState,
    });
    expect(cleanupSearchPanelState).toEqual(defaultState);
  });
});
