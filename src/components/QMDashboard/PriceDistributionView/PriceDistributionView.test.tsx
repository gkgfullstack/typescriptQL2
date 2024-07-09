import React from 'react';
import { shallow } from 'enzyme';
import PriceDistributionView, { PriceDistributionViewProps } from './PriceDistributionView';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import PriceAnalysisItem from 'src/types/PriceAnalysisItem';
import routes from 'src/routes';
import { PriceVarianceFilter } from 'src/types/PriceVarianceFilter';

jest.mock('src/hooks/useQueryUrlParamsDispatch');

const useQueryUrlParamsDispatchMock = useQueryUrlParamsDispatch as jest.Mock;

const variance: PriceVarianceFilter[] = [
  {
    Id: 2,
    label: 'Priced 10 to 25% Lower',
    max: -10,
    min: -25,
  },
  {
    Id: 3,
    label: 'Priced 2 to 10% Lower',
    max: -2,
    min: -10,
  },
  {
    Id: 4,
    label: 'Priced with market',
    max: 2,
    min: -2,
  },
  {
    Id: 5,
    label: 'Priced 2 to 10% Higher',
    max: 10,
    min: 2,
  },
  {
    Id: 6,
    label: 'Priced 10 to 25% Higher',
    max: 25,
    min: 10,
  },
];

const priceDistribution: PriceAnalysisItem[] = [
  {
    id: '2',
    label: 'Amazon',
    below: 50,
    similar: 35,
    above: 15,
  },
  { id: '3', label: 'Atwoods', below: 23, similar: 25, above: 52 },
  { id: '5', label: 'AutoAnything', below: 40, similar: 5, above: 55 },
  { id: '4', label: 'Auto Parts Warehouse', below: 80, similar: 12, above: 8 },
];

const getProps = (
  data: PriceAnalysisItem[] | null = priceDistribution,
  loading: boolean = false
): PriceDistributionViewProps => ({
  priceVariance: variance,
  loading: loading,
  data: data,
  error: null,
  itemsPerPage: 3,
  queryParameter: 'sites',
});

describe('PriceDistributionView component', () => {
  let setQuery = jest.fn();
  beforeEach(() => {
    useQueryUrlParamsDispatchMock.mockReturnValue(setQuery);
  });
  afterAll(() => {
    useQueryUrlParamsDispatchMock.mockRestore();
  });
  it('renders without crashing', () => {
    shallow(<PriceDistributionView {...getProps()} />);
  });
  it('renders PriceAnalysis chart when data is loaded and there is no error', () => {
    const props = getProps();
    const wrapper = shallow(<PriceDistributionView {...props} />);
    const chart = wrapper.find('PriceAnalysis');
    expect(chart).toHaveLength(1);
    expect(chart.prop('items')).toEqual(props.data);
    expect(chart.prop('itemsPerPage')).toEqual(props.itemsPerPage);
    expect(chart.prop('onLabelClick')).toBeDefined();
    expect(chart.prop('onValueClick')).toBeDefined();
  });
  it('calls setQuery with setting up ids to selected label id when PriceAnalysis chart is shown and onLabelClick event fires', () => {
    const wrapper = shallow(<PriceDistributionView {...getProps()} />);
    const onLabelClick: Function = wrapper.find('PriceAnalysis').prop('onLabelClick') as Function;
    onLabelClick(priceDistribution[0]);
    expect(setQuery).toHaveBeenCalled();
    expect(setQuery).toHaveBeenCalledWith({ sites: [priceDistribution[0].id] }, routes.productFinder);
  });
  it('calls setQuery with setting up ids to selected label id and price variance ids to above values when PriceAnalysis chart is shown and onValueClick event fires and type of selected item is above', () => {
    const wrapper = shallow(<PriceDistributionView {...getProps()} />);
    const onValueClick: Function = wrapper.find('PriceAnalysis').prop('onValueClick') as Function;
    onValueClick('above', priceDistribution[0]);
    expect(setQuery).toHaveBeenCalled();
    expect(setQuery).toHaveBeenCalledWith(
      { sites: [priceDistribution[0].id], pricev: ['5', '6'] },
      routes.productFinder
    );
  });
  it('calls setQuery with setting up ids to selected label id and price variance ids to similar values when PriceAnalysis chart is shown and onValueClick event fires and type of selected item is similar', () => {
    const wrapper = shallow(<PriceDistributionView {...getProps()} />);
    const onValueClick: Function = wrapper.find('PriceAnalysis').prop('onValueClick') as Function;
    onValueClick('similar', priceDistribution[0]);
    expect(setQuery).toHaveBeenCalled();
    expect(setQuery).toHaveBeenCalledWith({ sites: [priceDistribution[0].id], pricev: ['4'] }, routes.productFinder);
  });
  it('calls setQuery with setting up ids to selected label id and price variance ids to below values when PriceAnalysis chart is shown and onValueClick event fires and type of selected item is below', () => {
    const wrapper = shallow(<PriceDistributionView {...getProps()} />);
    const onValueClick: Function = wrapper.find('PriceAnalysis').prop('onValueClick') as Function;
    onValueClick('below', priceDistribution[0]);
    expect(setQuery).toHaveBeenCalled();
    expect(setQuery).toHaveBeenCalledWith(
      { sites: [priceDistribution[0].id], pricev: ['2', '3'] },
      routes.productFinder
    );
  });
  it('does not render PriceAnalysis chart when data is not defined', () => {
    const props = getProps(null, true);
    const wrapper = shallow(<PriceDistributionView {...props} />);
    const chart = wrapper.find('PriceAnalysis');
    expect(chart).toHaveLength(0);
  });
  it('renders Spin component when data is loading', () => {
    const props = getProps(null, true);
    const wrapper = shallow(<PriceDistributionView {...props} />);
    const spinner = wrapper.find('Spin');
    expect(spinner).toHaveLength(1);
  });
  it('does not render Spin component when data is loaded', () => {
    const wrapper = shallow(<PriceDistributionView {...getProps()} />);
    const spinner = wrapper.find('Spin');
    expect(spinner).toHaveLength(0);
  });
  it('renders Alert error message component when there is error', () => {
    const props = getProps();
    props.error = 'something went wrong!';
    const wrapper = shallow(<PriceDistributionView {...props} />);
    const alert = wrapper.find('Alert');
    expect(alert).toHaveLength(1);
    expect(alert.prop('description')).toEqual(
      'An error has occurred when trying to get price distribution! Please try again later!'
    );
    expect(alert.prop('type')).toEqual('error');
  });
  it('does not render Alert error message component tab when there is no error', () => {
    const wrapper = shallow(<PriceDistributionView {...getProps()} />);
    const alert = wrapper.find('Alert');
    expect(alert).toHaveLength(0);
  });
});
