import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { FetchState } from 'src/reducers/fetchReducer';
import { useAppStateContext, useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { getCompetitors } from 'src/api/competitors';
import useCompetitorsFetching from './useCompetitorsFetching';
import Competitor from '../types/Competitor';
import { ACTION_TYPES, AppState } from '../stateProviders/appStateProvider';

jest.mock('src/api/competitors');
jest.mock('src/stateProviders/useAppStateContext');
const useAppStateContextMock = useAppStateContext as jest.Mock;
const useAppDispatchContextMock = useAppDispatchContext as jest.Mock;

const competitors: Competitor[] = [
  {
    ownerId: '1',
    ownerName: 'Amazone',
  },
];

const mockSuccessCompetitorsResponse = jest.fn(() =>
  Promise.resolve({
    competitorList: competitors,
  })
);

const mockFailureCompetitorsResponse = jest.fn(() =>
  Promise.reject({
    message: 'Something went wrong',
  })
);

let getCompetitorsMock: jest.Mock;
describe('useCompetitorsFetching hook ', () => {
  let dispatch = jest.fn();
  beforeEach(() => {
    getCompetitorsMock = getCompetitors as jest.Mock;
    dispatch = jest.fn();
    useAppDispatchContextMock.mockReturnValue(dispatch);
    useAppStateContextMock.mockReturnValue({ competitors: null });
  });
  afterEach(() => {
    getCompetitorsMock.mockRestore();
    useAppStateContextMock.mockRestore();
  });
  it('renders without crashing', async () => {
    await act(async () => {
      renderHook((): [FetchState<Competitor[]>] => useCompetitorsFetching());
    });
  });
  it('stores competitor list in app state to data that is received from api getCompetitors, loading should be false and there is no error when competitors is not cached in app state and fetch was successfull', async () => {
    getCompetitorsMock.mockImplementationOnce(mockSuccessCompetitorsResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<Competitor[]>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<Competitor[]>] => useCompetitorsFetching());
    });
    const { result } = renderHookResults;
    expect(getCompetitorsMock).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: ACTION_TYPES.setCompetitorList,
      payload: { competitors: competitors } as AppState,
    });
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toEqual(null);
  });
  it('returns state value such as data is null, loading is false and error is no false and competitors is not cached in app state when fetch was failed', async () => {
    getCompetitorsMock.mockImplementationOnce(mockFailureCompetitorsResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<Competitor[]>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<Competitor[]>] => useCompetitorsFetching());
    });
    const { result } = renderHookResults;
    expect(getCompetitorsMock).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual({ message: 'Something went wrong' });
    expect(result.current[0].data).toEqual(null);
  });
  it('returns state value such as data that is received from app state, loading should be false and there is no error without fetching data when competitors is cached in app state', async () => {
    useAppStateContextMock.mockReturnValue({ competitors: [{ ownerName: 'Ebay', ownerId: '1' }] });
    getCompetitorsMock.mockImplementationOnce(mockSuccessCompetitorsResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<Competitor[]>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<Competitor[]>] => useCompetitorsFetching());
    });
    const { result } = renderHookResults;
    expect(getCompetitorsMock).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toBeDefined();
    expect(result.current[0].data!.length).toEqual(1);
  });
});
