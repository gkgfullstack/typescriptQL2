import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { FetchState } from 'src/reducers/fetchReducer';
import { useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { logout } from 'src/api/logout';
import useLogoutFetch, { LogoutDispatch } from './useLogoutFetch';
import { ResponseHeader } from 'src/types/ResponseHeader';
import { ACTION_TYPES } from 'src/stateProviders/appStateProvider';

jest.mock('src/api/logout');
jest.mock('src/stateProviders/useAppStateContext');
const useAppDispatchContextMock = useAppDispatchContext as jest.Mock;

const mockSuccessLogoutResponse = jest.fn(() =>
  Promise.resolve({
    statusCode: '200',
    statusMessage: 'success',
  })
);

const mockSuccessErrorLogoutResponse = jest.fn(() =>
  Promise.resolve({
    statusCode: '400',
    statusMessage: 'error',
  })
);

const mockFailureLogoutResponse = jest.fn(() =>
  Promise.reject({
    message: 'Something went wrong',
  })
);

let logoutMock: jest.Mock;
describe('useLogoutFetch hook ', () => {
  let dispatch = jest.fn();
  beforeEach(() => {
    logoutMock = logout as jest.Mock;
    dispatch = jest.fn();
    useAppDispatchContextMock.mockReturnValue(dispatch);
  });
  afterEach(() => {
    logoutMock.mockRestore();
  });
  it('renders without crashing', async () => {
    await act(async () => {
      renderHook((): [FetchState<ResponseHeader>, LogoutDispatch] => useLogoutFetch());
    });
  });
  it('calls logout api end-point when logout method was called', async () => {
    logoutMock.mockImplementationOnce(mockSuccessLogoutResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, LogoutDispatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, LogoutDispatch] => useLogoutFetch());
    });
    const { result } = renderHookResults;
    expect(logoutMock).not.toHaveBeenCalled();
    expect(result.current[1].logout).toBeDefined();
    await act(async () => {
      result.current[1].logout();
    });
    expect(logoutMock).toHaveBeenCalled();
    expect(logoutMock).toHaveBeenCalledWith();
  });
  it('returns state value such as data that is received from api logout, loading should be false and there is no error when logout request was successful', async () => {
    logoutMock.mockImplementationOnce(mockSuccessLogoutResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, LogoutDispatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, LogoutDispatch] => useLogoutFetch());
    });
    let { result } = renderHookResults;
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toEqual(null);
    await act(async () => {
      result.current[1].logout();
    });
    result = renderHookResults.result;
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toBeDefined();
    expect(result.current[0].data!.statusCode).toEqual('200');
  });
  it('dispatches app user details clean up when logout request was successful', async () => {
    logoutMock.mockImplementationOnce(mockSuccessLogoutResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, LogoutDispatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, LogoutDispatch] => useLogoutFetch());
    });
    const { result } = renderHookResults;
    await act(async () => {
      result.current[1].logout();
    });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({ type: ACTION_TYPES.cleanupUserDetails });
  });
  it('updates state data prop when logout request was successful with status code 200', async () => {
    logoutMock.mockImplementationOnce(mockSuccessLogoutResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, LogoutDispatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, LogoutDispatch] => useLogoutFetch());
    });
    let { result } = renderHookResults;
    expect(result.current[0].data).toEqual(null);
    await act(async () => {
      result.current[1].logout();
    });
    result = renderHookResults.result;
    expect(result.current[0].data).toBeDefined();
    expect(result.current[0].data!.statusCode).toEqual('200');
  });
  it('updates state data prop when logout request was successful with status code that is does not equal 200', async () => {
    logoutMock.mockImplementationOnce(mockSuccessErrorLogoutResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, LogoutDispatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, LogoutDispatch] => useLogoutFetch());
    });
    let { result } = renderHookResults;
    expect(result.current[0].data).toEqual(null);
    expect(result.current[0].error).toEqual(false);
    await act(async () => {
      result.current[1].logout();
    });
    result = renderHookResults.result;
    expect(result.current[0].data).toBeDefined();
    expect(result.current[0].data!.statusCode).toEqual('400');
    expect(result.current[0].error).toEqual(false);
  });
  it('returns state value such as data is null, loading is false and error is no false when logout request was failed', async () => {
    logoutMock.mockImplementationOnce(mockFailureLogoutResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, LogoutDispatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, LogoutDispatch] => useLogoutFetch());
    });
    let { result } = renderHookResults;
    await act(async () => {
      result.current[1].logout();
    });
    result = renderHookResults.result;
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual({ message: 'Something went wrong' });
    expect(result.current[0].data).toEqual(null);
  });
});
