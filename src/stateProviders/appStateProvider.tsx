import React, { Context, Dispatch, useReducer } from 'react';
import produce from 'immer';
import UserInfo from 'src/types/UserInfo';
import Competitor from 'src/types/Competitor';
import { AppParam, UserDetailsResponse } from 'src/api/userDetails';
import AppPermissions from 'src/types/AppPermissions';
import Owner from 'src/types/Owner';
import ApplicationFilterType from 'src/types/ApplicationFilterType';
import DashboardActive from 'src/types/DashboardActive';
import DashboardLowQuality from 'src/types/DashboardLowQuality';
import DashboardScheduled from 'src/types/DashboardScheduled';
import RCSearchsType from 'src/types/RCSearchsType';
import DashboardReports from 'src/types/DashboardReports';
import TableResultlistType from 'src/types/TableResultlistType';
import FileTableResultType from 'src/types/FileTableResultType';
import RTLPreviewType from 'src/types/RTLPreviewType';
import SupportHelpTypePost from 'src/types/SupportHelpTypePost';

enum ACTION_TYPES {
  setUserDetails = 'SET_USER_DETAILS',
  setCompetitorList = 'SET_COMPETITOR_LIST',
  setOwnerList = 'SET_OWNER_LIST',
  setApplicationList = 'SET_APPLICATION_LIST',
  setRunId = 'SET_RUN_ID',
  cleanupUserDetails = 'CLEAN_UP_USER_DETAILS',
  setResultid = 'SET_RESULT_ID',
  setRLTPreview = 'RTL_PREVIEW',
  setLineItems = 'LINEITEMS',
  setResultList = 'RESULTLIST',
  setSupportHelp = 'SET_SUPPORTHELP',
  setPostSupportHelp = 'SETPOST_SUPPORTHELP',
  setSiteNotification = 'SITE_NOTIFICATIONS',
}

export type AppState = {
  user: UserInfo | null;
  defaultSourceOwnerId: string | null;
  matchTypeFilter: string;
  region: string;
  priceType: string;
  defaultResultid: string | null;
  defaultRunId: string | null;
  defaultAppId: string | null;
  authenticated: boolean;
  competitors: Competitor[] | null;
  owners: Owner[] | null;
  appId: ApplicationFilterType[] | null;
  dashboardRunning: DashboardActive[] | null;
  dashboardLowQuality: DashboardLowQuality[] | null;
  dashboardScheduled: DashboardScheduled[] | null;
  RCSearchss: RCSearchsType[] | null;
  dashboardReports: DashboardReports[] | null;
  runId: TableResultlistType[] | null;
  resultid: FileTableResultType[] | null;
  resultList: FileTableResultType[] | null;
  lineItems: RTLPreviewType[] | null;
  supportHelpUpdate: boolean | undefined;
  postSupportHelp: SupportHelpTypePost | undefined;
  vertical: string;
};

type UserDetailsAction = {
  type: ACTION_TYPES.setUserDetails;
  payload: UserDetailsResponse;
};

type CleanupUserDetailsAction = {
  type: ACTION_TYPES.cleanupUserDetails;
};

type AppDefaultAction = {
  type:
    | ACTION_TYPES.setCompetitorList
    | ACTION_TYPES.setOwnerList
    | ACTION_TYPES.setApplicationList
    | ACTION_TYPES.setRunId
    | ACTION_TYPES.setResultid
    | ACTION_TYPES.setLineItems
    | ACTION_TYPES.setResultList
    | ACTION_TYPES.setSupportHelp
    | ACTION_TYPES.setPostSupportHelp
    | ACTION_TYPES.setSiteNotification;
  payload: AppState;
};

type AppAction = UserDetailsAction | CleanupUserDetailsAction | AppDefaultAction;

export const defaultState: AppState = {
  user: null,
  defaultSourceOwnerId: null,
  defaultResultid: null,
  defaultRunId: null,
  defaultAppId: null,
  authenticated: false,
  competitors: null,
  owners: null,
  dashboardRunning: null,
  dashboardLowQuality: null,
  dashboardScheduled: null,
  RCSearchss: null,
  dashboardReports: null,
  appId: null,
  runId: null,
  resultid: null,
  lineItems: null,
  resultList: null,
  supportHelpUpdate: false,
  postSupportHelp: undefined,
  matchTypeFilter: 'ALL',
  region: '-1',
  priceType: '1',
  vertical: '106',
};

const DispatchContext: Context<Dispatch<AppAction>> = React.createContext<Dispatch<AppAction>>(
  {} as Dispatch<AppAction>
);
const StateContext: Context<Partial<AppState>> = React.createContext<Partial<AppState>>({});

export const reducer = (state: AppState, action: AppAction): AppState =>
  produce(state, (draft: AppState) => {
    switch (action.type) {
      case ACTION_TYPES.setUserDetails: {
        const { userId, appParam, userName, hasAppAdminPriv } = action.payload;

        const permissions: AppPermissions = {} as AppPermissions;
        if (appParam) {
          appParam.forEach((permission: AppParam) => {
            if (permission.value) {
              permissions[permission.name] = permission.value;
            }
          });
        }
        draft.authenticated = !!userId;
        draft.user = {
          userId: userId || '',
          appPermissions: permissions,
          userName: userName || '',
          isAdminMode: hasAppAdminPriv,
        } as UserInfo;

        return draft;
      }
      case ACTION_TYPES.cleanupUserDetails: {
        draft.authenticated = false;
        draft.user = null;

        return draft;
      }
      case ACTION_TYPES.setSiteNotification: {
        const { vertical } = action.payload;
        draft.vertical = vertical;
        return draft;
      }
      case ACTION_TYPES.setCompetitorList: {
        const { competitors } = action.payload;
        draft.competitors = competitors ? [...competitors] : null;

        return draft;
      }
      case ACTION_TYPES.setLineItems: {
        const { lineItems } = action.payload;
        draft.lineItems = lineItems ? [...lineItems] : null;

        return draft;
      }
      case ACTION_TYPES.setOwnerList: {
        const { owners } = action.payload;
        draft.owners = owners ? [...owners] : null;
        const defaultOwner: Owner | null | undefined = draft.owners
          ? draft.owners.find((owner: Owner): boolean => {
              return owner.isDefault;
            })
          : null;
        draft.defaultSourceOwnerId = defaultOwner ? defaultOwner.id : null;

        return draft;
      }
      case ACTION_TYPES.setApplicationList: {
        const { appId } = action.payload;
        draft.appId = appId ? [...appId] : null;
        const defaultAppId: ApplicationFilterType | null | undefined = draft.appId
          ? draft.appId.find((appId: ApplicationFilterType): string => {
              return appId.ID;
            })
          : null;
        draft.defaultAppId = defaultAppId ? defaultAppId.ID : null;
        return draft;
      }
      case ACTION_TYPES.setRunId: {
        const { runId } = action.payload;
        draft.runId = runId ? [...runId] : null;
        const defaultRunId: TableResultlistType | null | undefined = draft.runId
          ? draft.runId.find((runId: TableResultlistType): string => {
              return runId.runId;
            })
          : null;
        draft.defaultRunId = defaultRunId ? defaultRunId.runId : null;
        return draft;
      }

      case ACTION_TYPES.setResultid: {
        const { resultid } = action.payload;
        draft.resultid = resultid ? [...resultid] : null;
        const defaultResultid: FileTableResultType | null | undefined = draft.resultid
          ? draft.resultid.find((resultid: FileTableResultType): string => {
              return resultid.resultid;
            })
          : null;
        draft.defaultResultid = defaultResultid ? defaultResultid.resultid : null;
        return draft;
      }
      case ACTION_TYPES.setResultList: {
        const { resultList } = action.payload;
        draft.resultList = resultList ? [...resultList] : null;

        return draft;
      }
      case ACTION_TYPES.setSupportHelp: {
        const { supportHelpUpdate } = action.payload;
        draft.supportHelpUpdate = supportHelpUpdate ? supportHelpUpdate : undefined;
        //draft.supportHelpUpdate=supportHelpUpdate;
        return draft;
      }

      case ACTION_TYPES.setPostSupportHelp: {
        const { postSupportHelp } = action.payload;
        draft.postSupportHelp = postSupportHelp ? { ...postSupportHelp } : undefined;
        //draft.postSupportHelp=postSupportHelp;
        return draft;
      }

      default: {
        throw new Error(`Unhandled action type: ${action!}`);
      }
    }
  });

export const DispatchProvider = DispatchContext.Provider;
export const StateProvider = StateContext.Provider;
type AppStateProviderProps = {
  children: React.ReactNode;
};

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }: AppStateProviderProps) => {
  const initState = {
    ...defaultState,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <DispatchProvider value={dispatch}>
      <StateProvider value={state}>{children} </StateProvider>
    </DispatchProvider>
  );
};

export { AppStateProvider, DispatchContext, StateContext, ACTION_TYPES };
