import { useContext } from 'react';

import { DispatchContext, SiteCodeState, StateContext } from './siteCodeStateProvider';

const useSiteCodeStateContext = (): Partial<SiteCodeState> => {
  const state = useContext<Partial<SiteCodeState>>(StateContext);

  if (state === undefined) {
    throw new Error('must be used within a Provider');
  }

  return state;
};

const useSiteCodeDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('must be used within a Provider');
  }

  return dispatch;
};

export { useSiteCodeDispatchContext, useSiteCodeStateContext };
