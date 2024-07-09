import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { FetchState } from 'src/reducers/fetchReducer';
import useTableauReportFetch from './useTableauReportFetch';
import { getTableauReport, TableauReportResponse } from 'src/api/tableauReport';

jest.mock('src/api/tableauReport');

const report: TableauReportResponse = {
  reportURL: 'http://reporturl',
};

const mockSuccessGetReportResponse = jest.fn(() => Promise.resolve(report));
const mockSuccessGerReportWithoutDataResponse = jest.fn(() => Promise.resolve(undefined));

const mockFailureGetReportResponse = jest.fn(() =>
  Promise.reject({
    message: 'Something went wrong',
  })
);
let getTableauReportMock: jest.Mock;

describe('useTableauReportFetch hook ', () => {
  beforeEach(() => {
    getTableauReportMock = getTableauReport as jest.Mock;
  });
  afterEach(() => {
    getTableauReportMock.mockRestore();
  });
  it('renders without crashing', async () => {
    getTableauReportMock.mockImplementationOnce(mockSuccessGetReportResponse);
    await act(async () => {
      renderHook((): [FetchState<string>] => useTableauReportFetch());
    });
  });
  it('returns state value such as data that is received from api getTableauReport, loading should be false and there is no error when getTableauReport request was successful', async () => {
    getTableauReportMock.mockImplementationOnce(mockSuccessGetReportResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<string>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<string>] => useTableauReportFetch());
    });
    let { result } = renderHookResults;
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual(false);
    expect(result.current[0].data).toEqual(report.reportURL);
  });
  it('returns state value such as data is null, loading is false and error is no false when getTableauReport request was failed', async () => {
    getTableauReportMock.mockImplementationOnce(mockFailureGetReportResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<string>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<string>] => useTableauReportFetch());
    });
    const { result } = renderHookResults;
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error).toEqual({ message: 'Something went wrong' });
    expect(result.current[0].data).toEqual(null);
  });
  it('returns state value such as data is null, loading is false and error is no false when getTableauReport request was success but data is undefined', async () => {
    getTableauReportMock.mockImplementationOnce(mockSuccessGerReportWithoutDataResponse);
    let renderHookResults = {} as RenderHookResult<{}, [FetchState<string>]>;
    await act(async () => {
      renderHookResults = renderHook((): [FetchState<string>] => useTableauReportFetch());
    });
    const { result } = renderHookResults;
    expect(result.current[0].loading).toEqual(false);
    expect(result.current[0].error.message).toBeDefined();
    expect(result.current[0].data).toEqual(null);
  });
});
