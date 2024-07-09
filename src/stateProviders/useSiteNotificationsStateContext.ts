import { useContext } from 'react';

import { DispatchContext, SiteNotificationsState, StateContext } from './siteNotificationsStateProvider';

const useSiteNotificationsStateContext = (): Partial<SiteNotificationsState> => {
  const state = useContext<Partial<SiteNotificationsState>>(StateContext);

  if (state === undefined) {
    throw new Error('must be used within a Provider');
  }

  return state;
};

const useSiteNotificationsDispatchContext = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch === undefined) {
    throw new Error('must be used within a Provider');
  }

  return dispatch;
};

export { useSiteNotificationsDispatchContext, useSiteNotificationsStateContext };
