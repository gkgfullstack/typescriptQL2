import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { useAppStateContext, useAppDispatchContext } from 'src/stateProviders/useAppStateContext';
import { getPriceDistribution, PriceDistributionResponse } from 'src/api/priceDistribution';
import usePriceDistributionFetch from './usePriceDistributionFetch';
import { PriceDistributionChart } from '../PriceDistributionGraph';
import { FetchState } from 'src/reducers/fetchReducer';

jest.mock('src/api/priceDistribution');
jest.mock('src/stateProviders/useAppStateContext');
const useAppStateContextMock = useAppStateContext as jest.Mock;
const useAppDispatchContextMock = useAppDispatchContext as jest.Mock;

const PriceDistributionData: PriceDistributionResponse = {
  priceDistributionList: [
    { id: '1', type: 'BELOW', sortOrder: -3, label: '>25%', value: '0' },
    { id: '2', type: 'BELOW', sortOrder: -2, label: '10-25%', value: '25' },
    { id: '3', type: 'BELOW', sortOrder: -1, label: '2-10%', value: '20' },
    { id: '4', type: 'SIMILAR', sortOrder: 0, label: '+/- 2%', value: '30' },
    { id: '5', type: 'ABOVE', sortOrder: 1, label: '2-10%', value: '43' },
    { id: '6', type: 'ABOVE', sortOrder: 2, label: '10-25%', value: '20' },
    { id: '7', type: 'ABOVE', sortOrder: 3, label: '25%<', value: '25' },
  ],
};
const PriceDistributionDataRefactoring: PriceDistributionChart[] = [
  { id: '1', key: 'BELOW&>25%', type: 'BELOW', sortOrder: -3, label: '>25%', value: 0 },
  { id: '2', key: 'BELOW&10-25%', type: 'BELOW', sortOrder: -2, label: '10-25%', value: 25 },
  { id: '3', key: 'BELOW&2-10%', type: 'BELOW', sortOrder: -1, label: '2-10%', value: 20 },
  { id: '4', key: 'SIMILAR&+/- 2%', type: 'SIMILAR', sortOrder: 0, label: '+/- 2%', value: 30 },
  { id: '5', key: 'ABOVE&2-10%', type: 'ABOVE', sortOrder: 1, label: '2-10%', value: 43 },
  { id: '6', key: 'ABOVE&10-25%', type: 'ABOVE', sortOrder: 2, label: '10-25%', value: 20 },
  { id: '7', key: 'ABOVE&25%<', type: 'ABOVE', sortOrder: 3, label: '25%<', value: 25 },
];

const mockSuccessPriceDistributionResponse = jest.fn(() => Promise.resolve(PriceDistributionData));

const mockFailurePriceDistributionResponse = jest.fn(() =>
  Promise.reject({
    message: 'Something went wrong',
  })
);

let getPriceDistributionMock: jest.Mock;
describe('usePriceDistributionFetch hook ', () => {
  let dispatch = jest.fn();
  beforeEach(() => {
    getPriceDistributionMock = getPriceDistribution as jest.Mock;
    useAppDispatchContextMock.mockReturnValue(dispatch);
    useAppStateContextMock.mockReturnValue({});
  });
  afterEach(() => {
    getPriceDistributionMock.mockRestore();
    useAppStateContextMock.mockRestore();
  });
  it('renders without crashing', async () => {
    await act(async () => {
      renderHook((): FetchState<Array<PriceDistributionChart>> => usePriceDistributionFetch('1', '0', '-1', '-1'));
    });
  });
  it('returns initial state value such as data is null, loading is false and error is false', async () => {
    getPriceDistributionMock.mockImplementationOnce(jest.fn(() => Promise.reject(false)));
    let renderHookResults = {} as RenderHookResult<{}, FetchState<Array<PriceDistributionChart>>>;
    await act(async () => {
      renderHookResults = renderHook((): FetchState<Array<PriceDistributionChart>> => usePriceDistributionFetch('1', '0', '-1', '-1'));
    });
    const { result } = renderHookResults;
    expect(getPriceDistributionMock).toHaveBeenCalled();
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(false);
    expect(result.current.data).toEqual(null);
  });
  it('returns state value such as data that is received from api getPriceDistribution, loading should be false and there is no error when fetch was successful', async () => {
    getPriceDistributionMock.mockImplementationOnce(mockSuccessPriceDistributionResponse);
    let renderHookResults = {} as RenderHookResult<{}, FetchState<Array<PriceDistributionChart>>>;
    await act(async () => {
      renderHookResults = renderHook((): FetchState<Array<PriceDistributionChart>> => usePriceDistributionFetch('1', '0', '-1', '-1'));
    });
    const { result } = renderHookResults;
    expect(getPriceDistributionMock).toHaveBeenCalled();
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(false);
    expect(result.current.data).toEqual(PriceDistributionDataRefactoring);
  });
  it('returns state value such as data is null, loading is false and error is no false when fetch was failed', async () => {
    getPriceDistributionMock.mockImplementationOnce(mockFailurePriceDistributionResponse);
    let renderHookResults = {} as RenderHookResult<{}, FetchState<Array<PriceDistributionChart>>>;
    await act(async () => {
      renderHookResults = renderHook((): FetchState<Array<PriceDistributionChart>> => usePriceDistributionFetch('1', '0', '-1', '-1'));
    });
    const { result } = renderHookResults;
    expect(getPriceDistributionMock).toHaveBeenCalled();
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual({ message: 'Something went wrong' });
    expect(result.current.data).toEqual(null);
  });
  it('returns state value such as data is null, loading is false and error is false when sourceOwnerId is empty string and fetch do not called ', async () => {
    getPriceDistributionMock.mockImplementationOnce(mockFailurePriceDistributionResponse);
    let renderHookResults = {} as RenderHookResult<{}, FetchState<Array<PriceDistributionChart>>>;
    await act(async () => {
      renderHookResults = renderHook((): FetchState<Array<PriceDistributionChart>> => usePriceDistributionFetch('', '0', '-1', '-1'));
    });
    const { result } = renderHookResults;
    expect(getPriceDistributionMock).not.toHaveBeenCalled();
    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(false);
    expect(result.current.data).toEqual(null);
  });
});
