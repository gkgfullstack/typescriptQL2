import { renderHook } from '@testing-library/react-hooks';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import history from 'react-router-dom';
import { Action } from 'history';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

const mockLocation = {
  pathname: 'test.com',
  search: '',
  hash: '',
  state: null,
  key: '',
};
let pushMock = jest.fn();
const historyLocationMock = {
  replace: jest.fn(),
  length: 0,
  location: mockLocation,
  push: pushMock,
  go: jest.fn(),
  action: 'PUSH' as Action,
  goBack: jest.fn(),
  goForward: jest.fn(),
  block: jest.fn(),
  listen: jest.fn(),
  createHref: jest.fn(),
};

describe('useQueryUrlParamsDispatch hook ', () => {
  beforeEach(() => {
    jest.spyOn(history, 'useHistory').mockReturnValue(historyLocationMock);
  });
  afterEach(() => {});
  it('calls with default history location mock values, empty search query value and calls history.push with this set', () => {
    jest.spyOn(history, 'useLocation').mockReturnValue(mockLocation);
    const renderHookResults = renderHook(() => useQueryUrlParamsDispatch());
    const { result } = renderHookResults;
    result.current({});
    expect(pushMock).not.toHaveBeenCalled();
  });
  it('calls with setting search query and calls history.push with this set', () => {
    jest.spyOn(history, 'useLocation').mockReturnValue(mockLocation);
    const renderHookResults = renderHook(() => useQueryUrlParamsDispatch());
    const { result } = renderHookResults;
    result.current({
      test: 'value',
      test2: 'value2',
    });
    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith({
      pathname: 'test.com',
      search: '?test=value&test2=value2',
    });
  });
  it('calls with setting to current search query new params and calls history.push with this set', () => {
    jest.spyOn(history, 'useLocation').mockReturnValue({ ...mockLocation, search: '?test=value' });
    const renderHookResults = renderHook(() => useQueryUrlParamsDispatch());
    const { result } = renderHookResults;
    result.current({
      test2: 'value2',
      test3: 'value3',
    });
    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith({
      pathname: 'test.com',
      search: '?test=value&test2=value2&test3=value3',
    });
  });
  it('calls with setting new pathname, search query and fires history.push with this set', () => {
    jest.spyOn(history, 'useLocation').mockReturnValue({ ...mockLocation, search: '?test=value' });
    const renderHookResults = renderHook(() => useQueryUrlParamsDispatch());
    const { result } = renderHookResults;
    result.current(
      {
        test2: 'value2',
        test3: 'value3',
      },
      'changing.com'
    );
    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith({
      pathname: 'changing.com',
      search: '?test=value&test2=value2&test3=value3',
    });
  });
  it('calls with setting to current search query new params and clean equal true calls history.push with this set', () => {
    jest.spyOn(history, 'useLocation').mockReturnValue({ ...mockLocation, search: '?test=value' });
    const renderHookResults = renderHook(() => useQueryUrlParamsDispatch());
    const { result } = renderHookResults;
    result.current(
      {
        test2: 'value2',
        test3: 'value3',
      },
      '',
      true
    );
    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith({
      pathname: 'test.com',
      search: '?test2=value2&test3=value3',
    });
  });
});
