import { useContext } from 'react';

import { DispatchContext, EditTableState, StateContext } from './editTableStateProvider';

const useEditTableStateContext = (): Partial<EditTableState> => {
  const state = useContext<Partial<EditTableState>>(StateContext);

  if (state === undefined) {
    throw new Error('must be used within a Provider');
  }

  return state;
};

const useEditTableDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('must be used within a Provider');
  }

  return dispatch;
};

export { useEditTableDispatchContext, useEditTableStateContext };
