import React from 'react';
import { shallow } from 'enzyme';
import UserDetailsMenu from './UserDetailsMenu';
import useLogoutFetch, { LogoutDispatch } from '../hooks/useLogoutFetch';
import { FetchState } from 'src/reducers/fetchReducer';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import UserInfo from 'src/types/UserInfo';
import { ResponseHeader } from 'src/types/ResponseHeader';
import auth from 'src/services/auth';
import AppPermissions from 'src/types/AppPermissions';

const userInfo: UserInfo = {
  userName: 'JohnSmit',
  userId: '1234',
  appPermissions: { enable_qmatch: true } as AppPermissions,
};

const responseHeader: ResponseHeader = {
  statusCode: '200',
  statusMessage: 'success',
};

const logout = jest.fn();

const logoutFetchResults = (
  loading = false,
  data: ResponseHeader | null = responseHeader
): [FetchState<ResponseHeader>, LogoutDispatch] => {
  return [
    {
      loading: loading,
      data: data,
      error: null,
    } as FetchState<ResponseHeader>,
    { logout: logout },
  ];
};
jest.mock('src/stateProviders/useAppStateContext');
jest.mock('../hooks/useLogoutFetch');
jest.mock('src/services/auth');

const useLogoutFetchMock = useLogoutFetch as jest.Mock;
const useAppStateContextMock = useAppStateContext as jest.Mock;

describe('UserDetailsMenu component ', () => {
  let useEffect: jest.Mock;
  const mockUseEffect = (): void => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    useAppStateContextMock.mockReturnValue({ user: userInfo });
    /* mocking useEffect */
    useEffect = jest.spyOn(React, 'useEffect') as jest.Mock;
    mockUseEffect();
  });
  afterEach(() => {
    useEffect.mockRestore();
    useAppStateContextMock.mockRestore();
  });
  it('renders without crashing', () => {
    useLogoutFetchMock.mockReturnValue(logoutFetchResults(false, null));
    shallow(<UserDetailsMenu />);
  });
  it('render user menu with user name section and logout link', () => {
    useLogoutFetchMock.mockReturnValue(logoutFetchResults(false, null));
    const wrapper = shallow(<UserDetailsMenu />);
    const userMenu = wrapper.find('.user_menu');
    expect(userMenu).toHaveLength(1);
    expect(userMenu.find('.user_info h4').text()).toEqual(userInfo.userName);
    expect(
      userMenu
        .find('Button.logout_link')
        .children()
        .text()
    ).toEqual('Logout');
  });
  it('renders Logout button as disabled when logout is in progress', () => {
    const fetchResults = logoutFetchResults(true, null);
    useLogoutFetchMock.mockReturnValue(fetchResults);
    expect(
      shallow(<UserDetailsMenu />)
        .find('Button.logout_link')
        .prop('disabled')
    ).toEqual(true);
  });
  it('renders Logout button as enabled when logout is not in progress', () => {
    const fetchResults = logoutFetchResults(false, null);
    useLogoutFetchMock.mockReturnValue(fetchResults);
    expect(
      shallow(<UserDetailsMenu />)
        .find('Button.logout_link')
        .prop('disabled')
    ).toEqual(false);
  });
  it('calls fetch logout when logout button fires onClick event', () => {
    const fetchResults = logoutFetchResults(false, null);
    useLogoutFetchMock.mockReturnValue(fetchResults);
    const onClick: Function = shallow(<UserDetailsMenu />)
      .find('Button.logout_link')
      .prop('onClick') as Function;
    onClick();
    expect(logout).toHaveBeenCalled();
  });
  it('calls auth logout when logout process is finished', () => {
    const fetchResults = logoutFetchResults();
    const logoutSpy = jest.spyOn(auth, 'logout');
    useLogoutFetchMock.mockReturnValue(fetchResults);
    shallow(<UserDetailsMenu />);
    expect(logoutSpy).toHaveBeenCalled();
  });
});
