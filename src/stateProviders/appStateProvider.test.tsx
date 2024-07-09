import { defaultState, reducer, ACTION_TYPES, AppState, AppStateProvider } from './appStateProvider';
import { shallow } from 'enzyme';
import * as React from 'react';
import { AppParam } from '../api/userDetails';

const state: AppState = {
  user: null,
  authenticated: false,
  competitors: null,
  owners: null,
  defaultSourceOwnerId: null,
  defaultRunId:null, 
  defaultAppId:null, 
  appId:null, 
  dashboardRunning:null,
  dashboardLowQuality:null, 
  dashboardScheduled:null, 
  RCSearchss:null, 
  dashboardReports:null, 
  runId:null
};

describe('appStateProvider provider ', () => {
  it('updates state user prop to new user info when setUserDetails action fires and new user is defined', () => {
    let appState: AppState = reducer(state, {
      type: ACTION_TYPES.setUserDetails,
      payload: { userName: 'JohnSmith',   userId: '1234', appParam: [] as AppParam[] },
    });
    expect(appState.user).toEqual({ userName: 'JohnSmith',  userId: '1234', appPermissions: {} });

    appState = reducer(state, {
      type: ACTION_TYPES.setUserDetails,
      payload: {
        userName: 'JohnSmith',
        userId: '123',
        appParam: [
          { name: 'enable_qsearch', value: true },
          { name: 'enable_qmatch', value: false },
        ] as AppParam[],
      },
    });
    expect(appState.user).toEqual({
      userName: 'JohnSmith',
      userId: '123',
      appPermissions: { enable_qsearch: true },
    });
  });
  it('updates state competitors prop to new values when setCompetitorList action fires and new competitors are defined', () => {
    const appState: AppState = reducer(state, {
      type: ACTION_TYPES.setCompetitorList,
      payload: { competitors: [{ ownerId: '1', ownerName: 'Amazone' }] } as AppState,
    });
    expect(appState.competitors!.length).toEqual(1);
  });
  it('updates state owners prop to new values when setOwnerList action fires and new owners are defined', () => {
    const appState: AppState = reducer(state, {
      type: ACTION_TYPES.setOwnerList,
      payload: { owners: [{ id: '1', name: 'Amazone', isDefault: false }] } as AppState,
    });
    expect(appState.owners!.length).toEqual(1);
  });
  it('updates state defaultOwnerId prop to new value when setOwnerList action fires and isDefault is defined at least for one owner', () => {
    const appState: AppState = reducer(state, {
      type: ACTION_TYPES.setOwnerList,
      payload: { owners: [{ id: '1', name: 'Amazone', isDefault: true }] } as AppState,
    });
    expect(appState.defaultSourceOwnerId).toEqual('1');
  });
  it('updates state defaultOwnerId prop to empty when setOwnerList action fires and isDefault is not defined', () => {
    const appState: AppState = reducer(state, {
      type: ACTION_TYPES.setOwnerList,
      payload: { owners: [{ id: '1', name: 'Amazone', isDefault: false }] } as AppState,
    });
    expect(appState.defaultSourceOwnerId).toEqual(null);
  });

  it('renders appStateProvider component without crashing', () => {
    const wrapper = shallow(<AppStateProvider>Child</AppStateProvider>);
    expect(wrapper.find('ContextProvider')).toHaveLength(2);
    expect(
      wrapper
        .find('ContextProvider')
        .at(1)
        .prop('value')
    ).toEqual(defaultState);
    const dispatch = wrapper
      .find('ContextProvider')
      .at(0)
      .prop('value');
    expect(dispatch).toBeDefined();
  });
});
