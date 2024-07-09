import { useContext } from 'react';

import { DispatchContext, ResultDetailsState, StateContext } from './resultStateProvider';

const useResultStateContext = (): Partial<ResultDetailsState> => {
  const state = useContext<Partial<ResultDetailsState>>(StateContext);

  if (state === undefined) {
    throw new Error('must be used within a Provider');
  }

  return state; 
};

const useResultDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('must be used within a Provider');
  }

  return dispatch;
};

export { useResultDispatchContext, useResultStateContext };
