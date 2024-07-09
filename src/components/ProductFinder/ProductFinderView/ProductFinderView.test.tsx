import React from 'react';
import { shallow } from 'enzyme';
import ProductFinderView from './ProductFinderView';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import { useSearchProductsStateContext } from 'src/stateProviders/useSearchProductsStateContext';

jest.mock('src/hooks/useQueryUrlParams');
jest.mock('src/hooks/useQueryUrlParamsDispatch');
jest.mock('src/stateProviders/useSearchProductsStateContext');

const useQueryUrlParamsDispatchMock = useQueryUrlParamsDispatch as jest.Mock;
const useQueryUrlParamsMock = useQueryUrlParams as jest.Mock;
const useSearchProductsStateContextMock = useSearchProductsStateContext as jest.Mock;

describe('ProductFinderView component ', () => {
  let setQuery = jest.fn();
  beforeEach(() => {
    useQueryUrlParamsDispatchMock.mockReturnValue(setQuery);
    useQueryUrlParamsMock.mockReturnValue({});
    useSearchProductsStateContextMock.mockReturnValue({
      advancedFilters: {
        isOpen: false,
      },
    });
  });
  afterAll(() => {
    useQueryUrlParamsDispatchMock.mockRestore();
    useQueryUrlParamsMock.mockRestore();
  });
  it('render without crashing', () => {
    shallow(<ProductFinderView />);
  });
  it('renders SearchPanel with advanced filter value isOpen is equal "false" and checking class name', () => {
    const wrapper = shallow(<ProductFinderView />);
    expect(wrapper.find('SearchPanel')).toHaveLength(1);
    expect(wrapper.find('.without_filters')).toHaveLength(2);
    expect(wrapper.find('.with_filters')).toHaveLength(0);
  });
  it('renders SearchPanel with advanced filter value isOpen is equal "true" and checking class name', () => {
    useSearchProductsStateContextMock.mockReturnValue({
      advancedFilters: {
        isOpen: true,
      },
    });
    const wrapper = shallow(<ProductFinderView />);
    expect(wrapper.find('SearchPanel')).toHaveLength(1);
    expect(wrapper.find('.with_filters')).toHaveLength(0);
    expect(wrapper.find('.without_filters')).toHaveLength(2);
  });
});
