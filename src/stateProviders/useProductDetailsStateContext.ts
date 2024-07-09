import { useContext } from 'react';

import { DispatchContext, ProductDetailsState, StateContext } from './productDetailsStateProvider';

const useProductDetailsStateContext = (): Partial<ProductDetailsState> => {
  const state = useContext<Partial<ProductDetailsState>>(StateContext);

  if (state === undefined) {
    throw new Error('must be used within a Provider');
  }

  return state;
};

const useProductDetailsDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('must be used within a Provider');
  }

  return dispatch;
};

export { useProductDetailsDispatchContext, useProductDetailsStateContext };
