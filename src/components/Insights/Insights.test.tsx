import React from 'react';
import { shallow } from 'enzyme';
import Insights from './Insights';
import { FetchState } from 'src/reducers/fetchReducer';
import useTableauReportFetch from './hooks/useTableauReportFetch';

jest.mock('./hooks/useTableauReportFetch');
const useTableauReportFetchMock = useTableauReportFetch as jest.Mock;

const reportUrl = 'http://someurl';

const getReportUrlFetchResults = (loading = false, data: string | null = reportUrl): [FetchState<string>] => {
  return [
    {
      loading: loading,
      data: data,
      error: null,
    } as FetchState<string>,
  ];
};

describe('Insights component', () => {
  let useEffect: jest.Mock;
  const mockUseEffect = (): void => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    /* mocking useEffect */
    useEffect = jest.spyOn(React, 'useEffect') as jest.Mock;
    mockUseEffect();
  });
  afterEach(() => {
    useEffect.mockRestore();
    useTableauReportFetchMock.mockRestore();
  });
  it('renders without crashing', () => {
    useTableauReportFetchMock.mockReturnValue(getReportUrlFetchResults());
    shallow(<Insights />);
  });
  it('renders Alert message when getReport was failed', () => {
    const results = getReportUrlFetchResults();
    results[0].error = 'Something went wrong!';
    useTableauReportFetchMock.mockReturnValue(results);
    const wrapper = shallow(<Insights />);
    const alert = wrapper.find('Alert');
    expect(alert).toHaveLength(1);
    expect(alert.prop('message')).toEqual('Error');
    expect(alert.prop('description')).toEqual(
      'An error has occurred when trying to get report! Please try again later!'
    );
    expect(alert.prop('type')).toEqual('error');
  });
  it('renders Spin component when data is loading', () => {
    useTableauReportFetchMock.mockReturnValue(getReportUrlFetchResults(true));
    const wrapper = shallow(<Insights />);
    expect(wrapper.find('Spin')).toHaveLength(1);
  });
  it('renders TableauReport component when data is loaded and there is no errors', () => {
    useTableauReportFetchMock.mockReturnValue(getReportUrlFetchResults());
    const wrapper = shallow(<Insights />);
    const report = wrapper.find('TableauReport');
    expect(report).toHaveLength(1);
    expect(report.prop('url')).toEqual(reportUrl);
  });
});
