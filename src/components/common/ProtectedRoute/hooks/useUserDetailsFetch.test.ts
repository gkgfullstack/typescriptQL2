import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { FetchState } from 'src/reducers/fetchReducer';
import { useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { getUserDetails, UserDetailsResponse } from 'src/api/userDetails';
import useUserDetailsFetch from './useUserDetailsFetch';
import { ACTION_TYPES } from 'src/stateProviders/appStateProvider';
import auth from 'src/services/auth';
import UserContex from 'src/services/UserContex';

jest.mock('src/api/userDetails');
jest.mock('src/stateProviders/useAppStateContext');
jest.mock('src/services/auth');
jest.mock('src/services/UserContex');

const userDetails: UserDetailsResponse = {
  userName: 'JohnSmit',
  userId: '1234',
  appParam: [{ name: 'enable_qmatch', value: true }],
  timeZone: "",
  dateFormat: "",
  baseURL: "",
  accountId:23,
  orgId:123,
  orgName:"strig",
  environment:"",
  crm_name:"",
  pendoUserId: "",
  changePasswordFlag:""
};

const token = '123456';

const mockSuccessUserDetailsResponse = jest.fn(() => Promise.resolve(userDetails));
const mockSuccessUserDetailsWithoutDataResponse = jest.fn(() => Promise.resolve(undefined));

const mockFailureUserDetailsResponse = jest.fn(() =>
  Promise.reject({
    message: 'Something went wrong',
  })
);

const useAppDispatchContextMock = useAppDispatchContext as jest.Mock;
let getUserDetailsMock: jest.Mock;

describe('useUserDetailsFetch hook ', () => {
  let dispatch = jest.fn();
  beforeEach(() => {
    dispatch = jest.fn();
    getUserDetailsMock = getUserDetails as jest.Mock;
    useAppDispatchContextMock.mockReturnValue(dispatch);
  });
  afterEach(() => {
    getUserDetailsMock.mockRestore();
    useAppDispatchContextMock.mockRestore();
  });
  it('renders without crashing', async () => {
    getUserDetailsMock.mockImplementationOnce(mockSuccessUserDetailsResponse);
    await act(async () => {
      renderHook((): [FetchState<UserDetailsResponse>] => useUserDetailsFetch());
    });
  });
  it('returns state value such as data that is received from api getUserDetails, loading should be false and there is no error when token is defined and getUserDetails request was successful', async () => {
    getUserDetailsMock.mockImplementationOnce(mockSuccessUserDetailsResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<UserDetailsResponse>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<UserDetailsResponse>] => useUserDetailsFetch(token));
    });
    let { result } = renderHookResults;
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toEqual(userDetails);
  });
  it('does not call getUserDetails api when token is not defined', async () => {
    getUserDetailsMock.mockImplementationOnce(mockSuccessUserDetailsResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<UserDetailsResponse>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<UserDetailsResponse>] => useUserDetailsFetch());
    });
    let { result } = renderHookResults;
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toEqual(null);
    expect(getUserDetailsMock).not.toHaveBeenCalled();
  });
  it('dispatches app set user details when token is defined and getUserDetails request was successful and data is defined', async () => {
    getUserDetailsMock.mockImplementationOnce(mockSuccessUserDetailsResponse);
    await act(async () => {
      renderHook((): [FetchState<UserDetailsResponse>] => useUserDetailsFetch(token));
    });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPES.setUserDetails, payload: userDetails });
  });
  it('calls auth setUserId when token is defined and getUserDetails request was successful and data is defined', async () => {
    getUserDetailsMock.mockImplementationOnce(mockSuccessUserDetailsResponse);
    await act(async () => {
      renderHook((): [FetchState<UserDetailsResponse>] => useUserDetailsFetch(token));
    });
    expect(auth.setUserId).toHaveBeenCalled();
    expect(auth.setUserId).toHaveBeenCalledWith(userDetails.userId);
  });

  it('calls UserContex setUserId when token is defined and getUserDetails request was successful and data is defined', async () => {
    getUserDetailsMock.mockImplementationOnce(mockSuccessUserDetailsResponse);
    await act(async () => {
      renderHook((): [FetchState<UserDetailsResponse>] => useUserDetailsFetch(token));
    });
    expect(UserContex.setBaseUrl).toHaveBeenCalled();
    expect(UserContex.setBaseUrl).toHaveBeenCalledWith(userDetails.baseURL);
  });
  
  it('returns state value such as data is null, loading is false and error is no false when getUserDetails request was failed', async () => {
    getUserDetailsMock.mockImplementationOnce(mockFailureUserDetailsResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<UserDetailsResponse>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<UserDetailsResponse>] => useUserDetailsFetch(token));
    });
    const { result } = renderHookResults;
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual({ message: 'Something went wrong' });
    expect(result.current[0].data).toEqual(null);
  });
    it('returns state value such as data is null, loading is false and error is no false when getUserDetails request was success but data is undefined', async () => {
        getUserDetailsMock.mockImplementationOnce(mockSuccessUserDetailsWithoutDataResponse);
        let renderHookResults = {} as RenderHookResult<{}, [FetchState<UserDetailsResponse>]>;
        await act(async () => {
            renderHookResults = renderHook((): [FetchState<UserDetailsResponse>] => useUserDetailsFetch(token));
        });
        const { result } = renderHookResults;
        expect(result.current[0].loading).toEqual(false);
        expect(result.current[0].error.message).toEqual('Can\'t get user info');
        expect(result.current[0].data).toEqual(null);
    });
});
