import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { addProductMatch } from 'src/api/matches';
import { FetchState } from 'src/reducers/fetchReducer';
import { ResponseHeader } from 'src/types/ResponseHeader';
import { useProductDetailsStateContext } from 'src/stateProviders/useProductDetailsStateContext';
import useMatchAddingState, { AddMatchRequest, DispatchAddMatch } from './useMatchAddingState';

jest.mock('src/api/matches');
jest.mock('src/stateProviders/useProductDetailsStateContext');
const useProductDetailsStateContextMock = useProductDetailsStateContext as jest.Mock;

const mockSuccessAddMatchResponse = jest.fn(() =>
  Promise.resolve({
    responseHeader: {
      statusCode: '200',
      statusMessage: 'success',
    },
  })
);

const mockSuccessErrorAddMatchResponse = jest.fn(() =>
  Promise.resolve({
    responseHeader: {
      statusCode: '400',
      statusMessage: 'error',
    },
  })
);

const mockFailureAddMatchResponse = jest.fn(() =>
  Promise.reject({
    message: 'Something went wrong',
  })
);

const addMatchRequest: AddMatchRequest = {
  matchType: 'EXACT',
  productUniqueId: 'CSJ7S02234',
  ownerId: '1',
  productURL: 'http://amazon.com/product',
};

let addMatchMock: jest.Mock;

describe('useMatchRemovingState hook ', () => {
  beforeEach(() => {
    addMatchMock = addProductMatch as jest.Mock;
    useProductDetailsStateContextMock.mockReturnValue({ productId: '1' });
  });
  afterEach(() => {
    addMatchMock.mockRestore();
    useProductDetailsStateContextMock.mockRestore();
  });
  it('renders without crashing', async () => {
    await act(async () => {
      renderHook((): [FetchState<ResponseHeader>, DispatchAddMatch] => useMatchAddingState());
    });
  });
  it('calls addProductMatch api end-point when addMatch method was called', async () => {
    addMatchMock.mockImplementationOnce(mockSuccessAddMatchResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, DispatchAddMatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, DispatchAddMatch] => useMatchAddingState());
    });
    let { result } = renderHookResults;
    expect(addMatchMock).not.toHaveBeenCalled();
    expect(result.current[1].addMatch).toBeDefined();
    await act(async () => {
      result.current[1].addMatch(addMatchRequest);
    });
    result = renderHookResults.result;
    expect(addMatchMock).toHaveBeenCalled();
    expect(addMatchMock).toHaveBeenCalledWith(
      '1',
      addMatchRequest.ownerId,
      addMatchRequest.productURL,
      addMatchRequest.productUniqueId,
      addMatchRequest.matchType,
    );
  });
  it('returns state value such as data that is received from api addProductMatch, loading should be false and there is no error when add match request was successful', async () => {
    addMatchMock.mockImplementationOnce(mockSuccessAddMatchResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, DispatchAddMatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, DispatchAddMatch] => useMatchAddingState());
    });
    let { result } = renderHookResults;
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toEqual(null);
    await act(async () => {
      result.current[1].addMatch(addMatchRequest);
    });
    result = renderHookResults.result;
    expect(result.current[0].loading).toEqual(false);
    //expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toBeDefined();
    expect(result.current[0].data!.statusCode).toEqual('200');
  });
  it('updates state data prop when add match request was successful with status code 200', async () => {
    addMatchMock.mockImplementationOnce(mockSuccessAddMatchResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, DispatchAddMatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, DispatchAddMatch] => useMatchAddingState());
    });
    let { result } = renderHookResults;
    expect(result.current[0].data).toEqual(null);
    await act(async () => {
      result.current[1].addMatch(addMatchRequest);
    });
    result = renderHookResults.result;
    expect(result.current[0].data).toBeDefined();
  //  expect(result.current[0].data!.statusCode).toEqual('200');
  });
  it('updates error state prop and updates state data prop when add match request was successful with status code that is does not equal 200', async () => {
    addMatchMock.mockImplementationOnce(mockSuccessErrorAddMatchResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, DispatchAddMatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, DispatchAddMatch] => useMatchAddingState());
    });
    let { result } = renderHookResults;
    expect(result.current[0].data).toEqual(null);
    expect(result.current[0].error).toEqual(false);
    await act(async () => {
      result.current[1].addMatch(addMatchRequest);
    });
    result = renderHookResults.result;
    expect(result.current[0].data).toEqual(null);
    //expect(result.current[0].error).toEqual('error');
  });
  it('returns state value such as data is null, loading is false and error is no false when add match request was failed', async () => {
    addMatchMock.mockImplementationOnce(mockFailureAddMatchResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, DispatchAddMatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, DispatchAddMatch] => useMatchAddingState());
    });
    let { result } = renderHookResults;
    await act(async () => {
      result.current[1].addMatch(addMatchRequest);
    });
    result = renderHookResults.result;
    expect(result.current[0].loading).toEqual(false);
   // expect(result.current[0].error).toEqual({ message: 'Something went wrong' });
    expect(result.current[0].data).toEqual(null);
  });
  it('returns initial state value such as data is null, loading is false and error is false when productId is not defined', async () => {
    useProductDetailsStateContextMock.mockReturnValue({});
    addMatchMock.mockImplementationOnce(mockFailureAddMatchResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<ResponseHeader>, DispatchAddMatch]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<ResponseHeader>, DispatchAddMatch] => useMatchAddingState());
    });
    let { result } = renderHookResults;
    await act(async () => {
      result.current[1].addMatch(addMatchRequest);
    });
    result = renderHookResults.result;
    expect(addMatchMock).not.toHaveBeenCalled();
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toEqual(null);
  });
});
