import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
import ApplicationFilterType from 'src/types/ApplicationFilterType';
import SiteNotificationsTypePost from 'src/types/SiteNotificationsTypePost';

enum SITENOTIFICATIONS_ACTION_TYPES {
  setAppIdData = 'SET_APPID_DATA',  
  setPostSiteNotifications = 'SET_SITENOTIFICATIONS'
}

export type SiteNotificationsState = {
  vertical:ApplicationFilterType[]
  SiteNotificationData:SiteNotificationsTypePost | '';
};

export type SiteNotificationsAction = {
  type: SITENOTIFICATIONS_ACTION_TYPES;
  payload: SiteNotificationsState;
};
export const defaultState: SiteNotificationsState = {
  vertical:[],
  SiteNotificationData:''
};

const DispatchContext: Context<Dispatch<SiteNotificationsAction>> = React.createContext<Dispatch<SiteNotificationsAction>>(
  {} as Dispatch<SiteNotificationsAction>
);
const StateContext: Context<Partial<SiteNotificationsState>> = React.createContext<Partial<SiteNotificationsState>>({});

export const reducer = (state: SiteNotificationsState, action: SiteNotificationsAction): SiteNotificationsState =>
  produce(state, (draft: SiteNotificationsState) => {
    switch (action.type) {
      case SITENOTIFICATIONS_ACTION_TYPES.setAppIdData: {
        const { vertical } = action.payload;
        draft.vertical = vertical;
        return draft;
      }
      case SITENOTIFICATIONS_ACTION_TYPES.setPostSiteNotifications: {
        const { SiteNotificationData } = action.payload;
        draft.SiteNotificationData = SiteNotificationData;
        return draft;
      }     
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  });

export const DispatchSiteNotificationsProvider = DispatchContext.Provider;
export const SiteNotificationsStateContextProvider = StateContext.Provider;
type SiteNotificationsStateProviderProps = {
  children: React.ReactNode;
};

const SiteNotificationsStateProvider: React.FC<SiteNotificationsStateProviderProps> = ({
  children,
}: SiteNotificationsStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchSiteNotificationsProvider value={dispatch}>
      <SiteNotificationsStateContextProvider value={state}>{children}</SiteNotificationsStateContextProvider>
    </DispatchSiteNotificationsProvider>
  );
};

export { SiteNotificationsStateProvider, DispatchContext, StateContext, SITENOTIFICATIONS_ACTION_TYPES };
