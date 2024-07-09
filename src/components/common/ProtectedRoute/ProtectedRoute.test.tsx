import React from 'react';
import { shallow } from 'enzyme';
import ProtectedRoute from './ProtectedRoute';
import { FetchState } from 'src/reducers/fetchReducer';
import auth from 'src/services/auth';
import useTokenState from './hooks/useTokenState';
import useUserDetailsFetch from './hooks/useUserDetailsFetch';
import { AppParam, UserDetailsResponse } from 'src/api/userDetails';


const userInfo: UserDetailsResponse = {
  userName: 'JohnSmit',
  userId: '1234',
  appParam: [{ name: 'enable_qmatch', value: true }] as AppParam[],
  timeZone: "",
  dateFormat: "",
  baseURL: "",
  accountId:23,
  orgId:123,
  orgName:"strig",
  environment:"",
  crm_name:"",
  pendoUserId: "",
};

const useUserDetailsFetchResults = (
  loading = false,
  data: UserDetailsResponse | null = userInfo
): [FetchState<UserDetailsResponse>] => {
  return [
    {
      loading: loading,
      data: data,
      error: null,
    } as FetchState<UserDetailsResponse>,
  ];
};
jest.mock('./hooks/useUserDetailsFetch');
jest.mock('./hooks/useTokenState');
jest.mock('src/services/auth');

const useUserDetailsFetchMock = useUserDetailsFetch as jest.Mock;
const useTokenStateMock = useTokenState as jest.Mock;

describe('ProtectedRoute component ', () => {
  let useEffect: jest.Mock;
  const mockUseEffect = (): void => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    useTokenStateMock.mockReturnValue('123456');
    /* mocking useEffect */
    useEffect = jest.spyOn(React, 'useEffect') as jest.Mock;
    mockUseEffect();
  });
  afterEach(() => {
    useEffect.mockRestore();
    useTokenStateMock.mockRestore();
    useUserDetailsFetchMock.mockRestore();
  });
  it('renders without crashing', () => {
    useUserDetailsFetchMock.mockReturnValue(useUserDetailsFetchResults(false, null));
    shallow(<ProtectedRoute title={''} />);
  });
  it('render Route component with render method that returns children when token defined and user details are loaded', () => {
    useUserDetailsFetchMock.mockReturnValue(useUserDetailsFetchResults());
    const wrapper = shallow(
      <ProtectedRoute title={''}>
        <span>Children</span>
      </ProtectedRoute>
    );
    const route = wrapper.find('Route');
    expect(route).toHaveLength(1);
    const render: Function = route.prop('render') as Function;
    const content = render();
    expect(content).not.toEqual(null);
  });
  it('render Route component with render method that returns null when user details are not loaded', () => {
    useUserDetailsFetchMock.mockReturnValue(useUserDetailsFetchResults(false, null));
    const wrapper = shallow(
      <ProtectedRoute title={''}>
        <span>Children</span>
      </ProtectedRoute>
    );
    const route = wrapper.find('Route');
    expect(route).toHaveLength(1);
    const render: Function = route.prop('render') as Function;
    const content = render();
    expect(content).toEqual(null);
  });
  it('render Route component with render method that returns null when token is not defined or user details are not loaded or in progress', () => {
    useUserDetailsFetchMock.mockReturnValue(useUserDetailsFetchResults(false, null));
    const wrapper = shallow(
      <ProtectedRoute title={''}>
        <span>Children</span>
      </ProtectedRoute>
    );
    const route = wrapper.find('Route');
    expect(route).toHaveLength(1);
    const render: Function = route.prop('render') as Function;
    const content = render();
    expect(content).toEqual(null);
  });
  it('render Route component with render method that returns null when user details are loading', () => {
    useUserDetailsFetchMock.mockReturnValue(useUserDetailsFetchResults(true, null));
    const wrapper = shallow(
      <ProtectedRoute title={''}>
        <span>Children</span>
      </ProtectedRoute>
    );
    const route = wrapper.find('Route');
    expect(route).toHaveLength(1);
    const render: Function = route.prop('render') as Function;
    const content = render();
    expect(content).toEqual(null);
  });
  it('render Route component with render method that returns null when token is not defined', () => {
    useTokenStateMock.mockReturnValue('');
    useUserDetailsFetchMock.mockReturnValue(useUserDetailsFetchResults());
    const wrapper = shallow(
      <ProtectedRoute title={''}>
        <span>Children</span>
      </ProtectedRoute>
    );
    const route = wrapper.find('Route');
    expect(route).toHaveLength(1);
    const render: Function = route.prop('render') as Function;
    const content = render();
    expect(content).toEqual(null);
  });
  it('does not call auth logout when user details fetch was successful', () => {
    const fetchResults = useUserDetailsFetchResults();
    useUserDetailsFetchMock.mockReturnValue(fetchResults);
    const logoutSpy = jest.spyOn(auth, 'logout');
    shallow(
      <ProtectedRoute title={''}>
        <span>Children</span>
      </ProtectedRoute>
    );
    expect(logoutSpy).not.toHaveBeenCalled();
  });
  it('calls auth logout when user details fetch was failed', () => {
    const fetchResults = useUserDetailsFetchResults(false, null);
    fetchResults[0].error = 'Something went wrong!';
    useUserDetailsFetchMock.mockReturnValue(fetchResults);
    const logoutSpy = jest.spyOn(auth, 'logout');
    shallow(
      <ProtectedRoute title={''}>
        <span>Children</span>
      </ProtectedRoute>
    );
    expect(logoutSpy).toHaveBeenCalled();
  });
});
