import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import auth from 'src/services/auth';
import { Action } from 'history';
import history from 'react-router';
import { act } from 'react-test-renderer';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useTokenState from './useTokenState';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
}));
jest.mock('src/hooks/useQueryUrlParams');
jest.mock('src/services/auth');

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
  action: 'PUSH' as Action,
  goBack: jest.fn(),
  goForward: jest.fn(),
  block: jest.fn(),
  listen: jest.fn(),
  createHref: jest.fn(),
};

const useQueryUrlParamsMock = useQueryUrlParams as jest.Mock;

describe('useTokenState hook', () => {
  beforeEach(() => {
    jest.spyOn(history, 'useHistory').mockReturnValue(historyMock);
    useQueryUrlParamsMock.mockReturnValue({});
  });
  afterEach(() => {
    useQueryUrlParamsMock.mockRestore();
  });

  it('renders without crashing', async () => {
    await act(async () => {
      renderHook((): string | undefined => useTokenState());
    });
  });
  it('does not set token value when equal token url parameter is defined and equal stored token value', async () => {
    let renderHookResults = {} as RenderHookResult<{}, string | undefined>;
    useQueryUrlParamsMock.mockReturnValue({ token: 'some_token' });
    jest.spyOn(auth, 'getToken').mockReturnValueOnce('some_token');
    const tokenSpy = jest.spyOn(auth, 'setToken');
    await act(async () => {
      renderHookResults = renderHook((): string | undefined => useTokenState());
    });
    const { result } = renderHookResults;
    expect(result.current).toEqual('some_token');
    expect(tokenSpy).not.toHaveBeenCalled();
  });
  it('sets token value that equal token url parameter when it is defined and not equal stored token value', async () => {
    let renderHookResults = {} as RenderHookResult<{}, string | undefined>;
    jest.spyOn(auth, 'getToken').mockReturnValueOnce('1234567');
    useQueryUrlParamsMock.mockReturnValue({ token: 'some_token' });
    const tokenSpy = jest.spyOn(auth, 'setToken');
    await act(async () => {
      renderHookResults = renderHook((): string | undefined => useTokenState());
    });
    const { result } = renderHookResults;
    expect(result.current).toEqual('some_token');
    expect(tokenSpy).toHaveBeenCalled();
    expect(tokenSpy).toHaveBeenCalledWith('some_token');
  });
  it('sets token value that equal token url parameter when it is defined and not equal stored token value', async () => {
    let renderHookResults = {} as RenderHookResult<{}, string | undefined>;
    useQueryUrlParamsMock.mockReturnValue({ token: 'some_token' });
    jest.spyOn(auth, 'getToken').mockReturnValueOnce(null);
    const tokenSpy = jest.spyOn(auth, 'setToken');
    await act(async () => {
      renderHookResults = renderHook((): string | undefined => useTokenState());
    });
    const { result } = renderHookResults;
    expect(result.current).toEqual('some_token');
    expect(tokenSpy).toHaveBeenCalled();
    expect(tokenSpy).toHaveBeenCalledWith('some_token');
  });
  it('returns token value that equal token url parameter when it is defined', async () => {
    let renderHookResults = {} as RenderHookResult<{}, string | undefined>;
    useQueryUrlParamsMock.mockReturnValue({ token: 'some_token' });
    await act(async () => {
      renderHookResults = renderHook((): string | undefined => useTokenState());
    });
    const { result } = renderHookResults;
    expect(result.current).toEqual('some_token');
  });
  it('returns token value that equal stored token when it is defined and there is no token url parameter', async () => {
    let renderHookResults = {} as RenderHookResult<{}, string | undefined>;
    useQueryUrlParamsMock.mockReturnValue({});
    jest.spyOn(auth, 'getToken').mockReturnValueOnce('1234567');
    await act(async () => {
      renderHookResults = renderHook((): string | undefined => useTokenState());
    });
    const { result } = renderHookResults;
    expect(result.current).toEqual('1234567');
  });
  it('removes token value from url when it is defined', async () => {
    useQueryUrlParamsMock.mockReturnValue({ token: 'some_token' });
    await act(async () => {
      renderHook((): string | undefined => useTokenState());
    });
    expect(historyMock.push).toHaveBeenCalled();
    expect(historyMock.push).toHaveBeenCalledWith({ search: '?' });
  });
  it('calls auth logout when token is not defined', async () => {
    useQueryUrlParamsMock.mockReturnValue(undefined);
    await act(async () => {
      renderHook((): string | undefined => useTokenState());
    });
    expect(auth.logout).toHaveBeenCalled();
  });
});
