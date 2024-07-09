import { useContext } from 'react';

import { DispatchContext, StateContext } from './appStateProvider';

const useAppStateContext = () => {
  const state = useContext(StateContext);

  if (state === undefined) {
    throw new Error('must be used within a Provider');
  }

  return state;
};

const useAppDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('must be used within a Provider');
  }

  return dispatch;
};

export { useAppDispatchContext, useAppStateContext };
