import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { FetchState } from 'src/reducers/fetchReducer';
import { useAppStateContext, useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import useOwnersFetch from './useOwnersFetch';
import { ACTION_TYPES, AppState } from 'src/stateProviders/appStateProvider';
import Owner from 'src/types/Owner';
import { getOwners } from 'src/api/owners';

jest.mock('src/api/owners');
jest.mock('src/stateProviders/useAppStateContext');
const useAppStateContextMock = useAppStateContext as jest.Mock;
const useAppDispatchContextMock = useAppDispatchContext as jest.Mock;

const owners: Owner[] = [
  {
    id: '1',
    name: 'Amazon',
    isDefault: false,
  },
  {
    id: '2',
    name: 'Ebay',
    isDefault: true,
  },
];

const mockSuccessOwnersResponse = jest.fn(() =>
  Promise.resolve({
    sourceOwner: owners,
  })
);

const mockFailureOwnersResponse = jest.fn(() =>
  Promise.reject({
    message: 'Something went wrong',
  })
);

let getOwnersMock: jest.Mock;
describe('useOwnersFetch hook ', () => {
  let dispatch = jest.fn();
  beforeEach(() => {
    getOwnersMock = getOwners as jest.Mock;
    dispatch = jest.fn();
    useAppDispatchContextMock.mockReturnValue(dispatch);
    useAppStateContextMock.mockReturnValue({ owners: null });
  });
  afterEach(() => {
    getOwnersMock.mockRestore();
    useAppStateContextMock.mockRestore();
  });
  it('renders without crashing', async () => {
    await act(async () => {
      renderHook((): [FetchState<Owner[]>] => useOwnersFetch());
    });
  });
  it('stores owner list in app state to data that is received from api getOwners, loading should be false and there is no error when owners is not cached in app state and fetch was successfull', async () => {
    getOwnersMock.mockImplementationOnce(mockSuccessOwnersResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<Owner[]>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<Owner[]>] => useOwnersFetch());
    });
    const { result } = renderHookResults;
    expect(getOwnersMock).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: ACTION_TYPES.setOwnerList,
      payload: { owners: owners } as AppState,
    });
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toEqual(null);
  });
  it('returns state value such as data is null, loading is false and error is no false and owners is not cached in app state when fetch was failed', async () => {
    getOwnersMock.mockImplementationOnce(mockFailureOwnersResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<Owner[]>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<Owner[]>] => useOwnersFetch());
    });
    const { result } = renderHookResults;
    expect(getOwnersMock).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual({ message: 'Something went wrong' });
    expect(result.current[0].data).toEqual(null);
  });
  it('returns state value such as data that is received from app state, loading should be false and there is no error without fetching data when owners is cached in app state', async () => {
    useAppStateContextMock.mockReturnValue({ owners: [{ name: 'Ebay', id: '2', isDefault: false }] });
    getOwnersMock.mockImplementationOnce(mockSuccessOwnersResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<Owner[]>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<Owner[]>] => useOwnersFetch());
    });
    const { result } = renderHookResults;
    expect(getOwnersMock).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toBeDefined();
    expect(result.current[0].data!.length).toEqual(1);
  });
});
