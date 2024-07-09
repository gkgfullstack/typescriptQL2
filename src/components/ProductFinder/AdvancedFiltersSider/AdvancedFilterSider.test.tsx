import React from 'react';
import { shallow } from 'enzyme';
import { SEARCH_PRODUCTS_ACTION_TYPES, Filters } from 'src/stateProviders/searchProductsStateProvider';
import AdvancedFilterSider from './AdvancedFilterSider';
import { useSearchProductsDispatchContext } from 'src/stateProviders/useSearchProductsStateContext';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import { useAdvancedFiltersFetching } from './hooks';
import { ProductFinderFilters } from 'src/types/ProductFinderFilters';
import { FetchState } from 'src/reducers/fetchReducer';

const advancedFiltersData: ProductFinderFilters = {
  price: [
    {
      Id: 21,
      label: '0-4000',
      max: 4000,
      min: 0,
    },
  ],
  categoryList: [
    {
      id: "215891",
      label: "Air, Fuel, Emission & Exhaust",
      above: 74.07,
      similar: 0,
      below: 25.93,
    }
  ], 
  manufacturer: [
    {
      Id: 5178,
      label: 'FLOWMASTER INC.',
    },
    {
      Id: 5183,
      label: 'PUROLATOR',
    },
  ],
  active: [
    {
        label: "Include Inactive",
    }
],
insight: [
  {
      label: "Display Insights Only",
  }
],
  variance: [
    {
      Id: 2,
      label: 'Priced 10 to 25% Lower',
      max: -25,
      min: -10,
    },
    {
      Id: 3,
      label: 'Priced 2 to 10% Lower',
      max: -10,
      min: -2,
    },
    {
      Id: 4,
      label: 'Priced with market',
      max: 0,
      min: 0,
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
    {
      Id: 1,
      label: 'Priced 25% Lower',
      max: -25,
      min: 0,
    },
    {
      Id: 7,
      label: 'Priced 25% Higher',
      min: 25,
      max: 10,
    },
  ],
  owners: [
    {
      Id: 2,
      label: 'Amazon',
    },
    {
      Id: 3,
      label: 'Atwoods',
    },
  ],
  noOfMatches: [
    {
      Id: 11,
      label: '1',
      max: 1,
      min: 0,
    },
    {
      Id: 12,
      label: '2',
      max: 2,
      min: 1,
    },
    {
      Id: 13,
      label: '3',
      max: 3,
      min: 2,
    },
    {
      Id: 14,
      label: '4',
      max: 5,
      min: 3,
    },
    {
      Id: 15,
      label: '5',
      max: 6,
      min: 5,
    },
    {
      Id: 16,
      label: '6',
      max: 7,
      min: 6,
    },
    {
      Id: 17,
      label: '7',
      max: 8,
      min: 7,
    },
    {
      Id: 18,
      label: '8',
      max: 9,
      min: 8,
    },
    {
      Id: 19,
      label: '9',
      max: 10,
      min: 9,
    },
    {
      Id: 20,
      label: '10',
      min: 10,
      max: 10,
    },
  ],
};

const manufacturerDataReturn = [
  {
    value: '5178',
    label: 'FLOWMASTER INC.',
  },
  {
    value: '5183',
    label: 'PUROLATOR',
  },
];
const siteDataReturn = [
  {
    value: '2',
    label: 'AMAZON',
  },
  {
    value: '3',
    label: 'ATWOODS',
  },
];

jest.mock('src/hooks/useQueryUrlParams');
jest.mock('src/hooks/useQueryUrlParamsDispatch');
jest.mock('src/stateProviders/useSearchProductsStateContext');
jest.mock('./hooks/useAdvancedFiltersFetching');

const useSearchProductsDispatchContextMock = useSearchProductsDispatchContext as jest.Mock;
const useQueryUrlParamsDispatchMock = useQueryUrlParamsDispatch as jest.Mock;
const useQueryUrlParamsMock = useQueryUrlParams as jest.Mock;
const useAdvancedFiltersFetchingMock = useAdvancedFiltersFetching as jest.Mock;

const getAdvancedFiltersFetchResults = (
  loading = false,
  error = false,
  filters: ProductFinderFilters | null = advancedFiltersData
): FetchState<ProductFinderFilters> => {
  return {
    loading: loading,
    data: filters,
    error: error,
  } as FetchState<ProductFinderFilters>;
};

describe('AdvancedFilterSider component ', () => {
  let dispatch = jest.fn();
  let setQuery = jest.fn();
  const fetchResults = getAdvancedFiltersFetchResults();
  beforeEach(() => {
    useQueryUrlParamsDispatchMock.mockReturnValue(setQuery);
    useQueryUrlParamsMock.mockReturnValue({});
    useAdvancedFiltersFetchingMock.mockReturnValue(fetchResults);
  });
  afterAll(() => {
    useQueryUrlParamsDispatchMock.mockRestore();
    useQueryUrlParamsMock.mockRestore();
    useAdvancedFiltersFetchingMock.mockRestore();
  });
  it('renders without crashing', () => {
    shallow(<AdvancedFilterSider />);
  });
  it('renders BrandFilter component', () => {
    const wrapper = shallow(<AdvancedFilterSider />);
    const views = wrapper.find('FilterWithMultiSelection');
    expect(views).toHaveLength(3);
    const view = views.at(1);
    expect(view.prop('onOptionsSelected')).toBeDefined();
    expect(view.prop('defaultOptions')).toEqual(undefined);
    expect(view.prop('header')).toEqual('Manufacturer');
    expect(view.prop('options')).toEqual(manufacturerDataReturn);
  });
  it('renders SitesFilter component', () => {
    const wrapper = shallow(<AdvancedFilterSider />);
    const views = wrapper.find('FilterWithMultiSelection');
    expect(views).toHaveLength(3);
    const view = views.at(2);
    expect(view.prop('onOptionsSelected')).toBeDefined();
    expect(view.prop('defaultOptions')).toEqual(undefined);
    expect(view.prop('header')).toEqual('Site');
    expect(view.prop('options')).toEqual(siteDataReturn);
  });
  // it('renders SortByFilter component', () => {
  //   const wrapper = shallow(<AdvancedFilterSider />);
  //   const view = wrapper.find('SortByFilter');
  //   expect(view).toHaveLength(1);
  //   expect(view.prop('onSelect')).toBeDefined();
  // });
  it('renders PriceVarianceFilter component', () => {
    const wrapper = shallow(<AdvancedFilterSider />);
    const views = wrapper.find('FilterWithMultiSelection');
    expect(views).toHaveLength(3);
    const view = views.at(0);
    expect(view.prop('options')).toEqual([
      {
        value: '2',
        label: 'Priced 10 to 25% Lower',
      },
      {
        value: '3',
        label: 'Priced 2 to 10% Lower',
      },
      {
        value: '4',
        label: 'Priced with market',
      },
      {
        value: '5',
        label: 'Priced 2 to 10% Higher',
      },
      {
        value: '6',
        label: 'Priced 10 to 25% Higher',
      },
      {
        value: '1',
        label: 'Priced 25% Lower',
      },
      {
        value: '7',
        label: 'Priced 25% Higher',
      },
    ]);
    expect(view.prop('defaultOptions')).toEqual(undefined);
    expect(view.prop('onOptionsSelected')).toBeDefined();
    expect(view.prop('keyName')).toEqual('pricev');
    expect(view.prop('withSearch')).toEqual(false);
    expect(view.prop('sortingSelected')).toEqual(false);
  });
  it('renders MatchedProductsFilter component', () => {
    const wrapper = shallow(<AdvancedFilterSider />);
    const view = wrapper.find('MatchedProductsFilter');
    expect(view).toHaveLength(1);
    expect(view.prop('options')).toEqual([
      {
        label: '1',
        value: '11',
      },
      {
        label: '2',
        value: '12',
      },
      {
        label: '3',
        value: '13',
      },
      {
        label: '4',
        value: '14',
      },
      {
        label: '5',
        value: '15',
      },
      {
        label: '6',
        value: '16',
      },
      {
        label: '7',
        value: '17',
      },
      {
        label: '8',
        value: '18',
      },
      {
        label: '9',
        value: '19',
      },
      {
        label: '10',
        value: '20',
      },
    ]);
    expect(view.prop('defaultValue')).toEqual(undefined);
    expect(view.prop('onChange')).toBeDefined();
  });
  it('renders Spin component when data is loading, there is no filters', () => {
    const fetchResults = getAdvancedFiltersFetchResults(true, false, null);
    useAdvancedFiltersFetchingMock.mockReturnValue(fetchResults);
    const wrapper = shallow(<AdvancedFilterSider />);
    expect(wrapper.find('Spin')).toHaveLength(1);
  });
  it('does not renders Spin component when data is loaded and defined', () => {
    const fetchResults = getAdvancedFiltersFetchResults();
    useAdvancedFiltersFetchingMock.mockReturnValue(fetchResults);
    const wrapper = shallow(<AdvancedFilterSider />);
    expect(wrapper.find('Spin')).toHaveLength(0);
  });
  it('renders Error message when there is an error', () => {
    const fetchResults = getAdvancedFiltersFetchResults(false, true, null);
    fetchResults.error = 'Something went wrong!';
    useAdvancedFiltersFetchingMock.mockReturnValue(fetchResults);
    const wrapper = shallow(<AdvancedFilterSider />);
    const error = wrapper.find('Alert');
    expect(error).toHaveLength(1);
    expect(error.prop('type')).toEqual('error');
    expect(error.prop('message')).toEqual(
      'An error has occurred when trying to get filter list! Please try again later!'
    );
  });
  it('does not renders Error message when there is no error', () => {
    const fetchResults = getAdvancedFiltersFetchResults();
    useAdvancedFiltersFetchingMock.mockReturnValue(fetchResults);
    const wrapper = shallow(<AdvancedFilterSider />);
    expect(wrapper.find('Alert')).toHaveLength(0);
  });
  it('updates Search Products state to value is equal [1,2,3] when onBrandsSelect method fires', () => {
    useSearchProductsDispatchContextMock.mockReturnValue(dispatch);
    const wrapper = shallow(<AdvancedFilterSider />);
    const views = wrapper.find('FilterWithMultiSelection');
    expect(views).toHaveLength(3);
    const view = views.at(2);
    expect(view.prop('onOptionsSelected')).toBeDefined();
    const onOptionsSelected: Function = view.prop('onOptionsSelected') as Function;
    onOptionsSelected('brands', [1, 2, 3]);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchFilters,
      payload: ({ brands: [1, 2, 3] } as unknown) as Filters,
    });
  });
  // it('renders Filters Button component with default values', () => {
  //   const wrapper = shallow(<AdvancedFilterSider />);
  //   const view = wrapper.find('Button');
  //   expect(view).toHaveLength(0);
  //   //expect(view.prop('block')).toEqual(false);
  //   expect(view.prop('type')).toEqual('primary');
  //   expect(view.prop('onClick')).toBeDefined();
  // });
  // it('renders AdvancedFilterSider component when button method onClick calls and toggle collapsed value and updates Search Products state', () => {
  //   useSearchProductsDispatchContextMock.mockReturnValue(dispatch);
  //   let wrapper = shallow(<AdvancedFilterSider />);
  //   let button = wrapper.find('Button');
  //   let list = wrapper.find('FilterWithMultiSelection');
  //   expect(button).toHaveLength(0);
  //   expect(list).toHaveLength(3);
  //   //let handleFiltersClick: Function = button.prop('onClick') as Function;
  //   //handleFiltersClick();
  //   //button = wrapper.find('Button');
  //   //let icon = button.find('FontAwesomeIcon').at(0);
  //   expect(dispatch).toHaveBeenCalled();
  //   expect(dispatch).toHaveBeenCalledWith({
  //     type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchFilters,
  //     payload: { isOpen: true } as Filters,
  //   });
    //expect(button.prop('block')).toEqual(true);
    //expect(wrapper.find('.collapsed')).toHaveLength(1);
    //expect(icon.prop('icon')).toEqual(['far', 'chevron-right']);
    //button = wrapper.find('Button');
    //handleFiltersClick = button.prop('onClick') as Function;
    //handleFiltersClick();
    //button = wrapper.find('Button');
    //icon = button.find('FontAwesomeIcon').at(0);
  //   expect(dispatch).toHaveBeenCalled();
  //   expect(dispatch).toHaveBeenCalledWith({
  //     type: SEARCH_PRODUCTS_ACTION_TYPES.setSearchFilters,
  //     payload: { isOpen: false } as Filters,
  //   });
  //   //expect(button.prop('block')).toEqual(false);
  //   //expect(wrapper.find('.collapsed')).toHaveLength(0);
  //   //expect(icon.prop('icon')).toEqual(['far', 'sliders-h']);
  // });
});
