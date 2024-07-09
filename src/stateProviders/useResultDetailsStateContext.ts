import { useContext } from 'react';

import { DispatchContext, SearchDetailsState, StateContext } from './resultDetailsStateProvider';

const useResultDetailsStateContext = (): Partial<SearchDetailsState> => {
  const state = useContext<Partial<SearchDetailsState>>(StateContext);

  if (state === undefined) {
    throw new Error('must be used within a Search Detail');
  }

  return state;
};

const useResultDetailsDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('must be used within Search Detail');
  }

  return dispatch;
};

export { useResultDetailsDispatchContext, useResultDetailsStateContext };
