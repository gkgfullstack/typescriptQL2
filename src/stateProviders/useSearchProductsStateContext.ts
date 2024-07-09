import { useContext, Dispatch } from 'react';

import {
  DispatchContext,
  SearchProductsState,
  StateContext,
  SearchProductsAction,
} from './searchProductsStateProvider';

const useSearchProductsStateContext = (): Partial<SearchProductsState> => {
  const state = useContext<Partial<SearchProductsState>>(StateContext);

  if (state === undefined) {
    throw new Error('must be used within a Provider');
  }

  return state;
};

const useSearchProductsDispatchContext = (): Dispatch<SearchProductsAction> => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('must be used within a Provider');
  }

  return dispatch;
};

export { useSearchProductsDispatchContext, useSearchProductsStateContext };
