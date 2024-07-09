import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useSourceOwnerId from './useSourceOwnerId';

jest.mock('src/stateProviders/useAppStateContext');
jest.mock('src/hooks/useQueryUrlParams');
const useAppStateContextMock = useAppStateContext as jest.Mock;

const useQueryUrlParamsMock = useQueryUrlParams as jest.Mock;

describe('useSourceOwnerId hook ', () => {
  beforeEach(() => {
    useAppStateContextMock.mockReturnValue({ defaultSourceOwnerId: null });
    useQueryUrlParamsMock.mockReturnValue({});
  });
  afterEach(() => {
    useAppStateContextMock.mockRestore();
    useQueryUrlParamsMock.mockRestore();
  });
  it('renders without crashing', async () => {
    await act(async () => {
      renderHook((): string => useSourceOwnerId());
    });
  });
  it('returns source owner id as default source owner id value that is received from app state when source owner is not defined in url query and default source owner is cached in app state', async () => {
    useAppStateContextMock.mockReturnValue({ defaultSourceOwnerId: '2', owners: [ {id: '1'} ] });
    let renderHookResults = {} as RenderHookResult<{}, string>;
    await act(async () => {
      renderHookResults = renderHook((): string => useSourceOwnerId());
    });
    const { result } = renderHookResults;
    expect(result.current).toEqual('2');
  });
  it('returns source owner id as source owner id query value that is received from app state when source owner is defined in url query and default source owner is cached in app state', async () => {
    useAppStateContextMock.mockReturnValue({ defaultSourceOwnerId: '2', owners: [ {id: '1'}] });
    useQueryUrlParamsMock.mockReturnValue({ sourceOwnerId: '1' });
    let renderHookResults = {} as RenderHookResult<{}, string>;
    await act(async () => {
      renderHookResults = renderHook((): string => useSourceOwnerId());
    });
    const { result } = renderHookResults;
    expect(result.current).toEqual('1');
  });
  it('returns source owner id as source owner id query value that is received from app state when source owner is defined in url query and default source owner is not cached in app state', async () => {
    useAppStateContextMock.mockReturnValue({ owners: [ { id: '1' } ] });
    useQueryUrlParamsMock.mockReturnValue({ sourceOwnerId: '1' });
    let renderHookResults = {} as RenderHookResult<{}, string>;
    await act(async () => {
      renderHookResults = renderHook((): string => useSourceOwnerId());
    });
    const { result } = renderHookResults;
    expect(result.current).toEqual('1');
  });
  it('returns empty string value when source owner is not defined in url query and default source owner is not cached in app state', async () => {
    useAppStateContextMock.mockReturnValue({});
    useQueryUrlParamsMock.mockReturnValue({});
    let renderHookResults = {} as RenderHookResult<{}, string>;
    await act(async () => {
      renderHookResults = renderHook((): string => useSourceOwnerId());
    });
    const { result } = renderHookResults;
    expect(result.current).toEqual('');
  });
});
