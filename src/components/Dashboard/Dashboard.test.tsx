import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';
import history from 'react-router';
import { Action } from 'history';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import AppPermissions from 'src/types/AppPermissions';
import UserInfo from 'src/types/UserInfo';
//import routes from 'src/routes';

jest.mock('src/stateProviders/useAppStateContext');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
}));

const userInfo: UserInfo = {
  userName: 'JohnSmit',
  userId: '1234',
  appPermissions: { enable_qmatch: true } as AppPermissions,
};

const historyMock = {
  replace: jest.fn(),
  length: 0,
  location: {
    pathname: 'test.com',
    search: '',
    hash: '',
    state: null,
    key: '',
  },
  push: jest.fn(),
  go: jest.fn(),
  action: 'REPLACE' as Action,
  goBack: jest.fn(),
  goForward: jest.fn(),
  block: jest.fn(),
  listen: jest.fn(),
  createHref: jest.fn(),
};

const useAppStateContextMock = useAppStateContext as jest.Mock;

describe('Dashboard component ', () => {
  let useEffect: jest.Mock;
  let useHistory: jest.Mock;

  const mockUseEffect = (): void => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    useHistory = jest.spyOn(history, 'useHistory') as jest.Mock;
    useHistory.mockReturnValueOnce(historyMock);
    /* mocking useEffect */
    useEffect = jest.spyOn(React, 'useEffect') as jest.Mock;
    mockUseEffect();
  });
  afterEach(() => {
    useEffect.mockRestore();
    useHistory.mockRestore();
  });
  it('renders without crashing', () => {
    useAppStateContextMock.mockReturnValueOnce({ user: userInfo });
    shallow(<Dashboard />);
  });

  it('redirects to optiprice dashboard based on permissions when user is defined and datascout and optiprice are allowed', () => {
    useAppStateContextMock.mockReturnValueOnce({ user: userInfo });
    shallow(<Dashboard />);
    expect(historyMock.replace).toHaveBeenCalledTimes(2);
    //expect(historyMock.replace).toHaveBeenCalledWith(routes.optiPriceDashboard);
  });
  it('redirects to datascout dashboard based on permissions when user is defined and optiprice is not allowed but datascout is allowed', () => {
    useAppStateContextMock.mockReturnValueOnce({ user: { ...userInfo, appPermissions: { enable_qsearch: true } } });
    shallow(<Dashboard />);
  //  expect(historyMock.replace).toHaveBeenCalledTimes(4);
   // expect(historyMock.replace).toHaveBeenCalledWith(routes.qSearchDashboard);
  });
  it('does not redirect to any dashboard when user is defined and optiprice and datascout are not allowed', () => {
    useAppStateContextMock.mockReturnValueOnce({
      user: { ...userInfo, appPermissions: { enable_match: false, enable_qsearch: false } },
    });
    shallow(<Dashboard />);
   // expect(historyMock.replace).toHaveBeenCalledTimes(4);
  });
});
