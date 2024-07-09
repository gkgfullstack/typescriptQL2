import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';

jest.mock('src/stateProviders/useSearchProductsStateContext');
jest.mock('src/hooks/useQueryUrlParams');
jest.mock('src/hooks/useQueryUrlParamsDispatch');

const defaultSearchProp = {
  placeholder: 'Add more keywords to refine your results',
  defaultValue: '',
  loading: false,
};
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: (): {} => ({}),
  useLocation: (): {} => ({}),
}));

const useQueryUrlParamsDispatchMock = useQueryUrlParamsDispatch as jest.Mock;

describe('SearchBar component ', () => {
  let setQuery = jest.fn();
  let onChangeSearchValue = jest.fn();
  beforeEach(() => {
    useQueryUrlParamsDispatchMock.mockReturnValue(setQuery);
  });
  afterAll(() => {
    useQueryUrlParamsDispatchMock.mockRestore();
  });
  it('renders without crashing', () => {
    shallow(<SearchBar onChangeSearch={onChangeSearchValue} />);
  });
  it('renders SearchBar component with default placeholder value and changing placeholder value is equal "updated placeholder"', () => {
    const wrapper = shallow(<SearchBar onChangeSearch={onChangeSearchValue} />);
    expect(wrapper.prop('placeholder')).toEqual(defaultSearchProp.placeholder);
    wrapper.setProps({ placeholder: 'updated placeholder' });
  });
  it('renders SearchBar component with default defaultValue value and changing defaultValue value is equal "input search value"', () => {
    const wrapper = shallow(<SearchBar onChangeSearch={onChangeSearchValue} />);
    expect(wrapper.prop('defaultValue')).toEqual(defaultSearchProp.defaultValue);
    wrapper.setProps({ defaultValue: 'input search value' });
  });
  it('renders SearchBar component with default loading value and changing loading value is equal "true"', () => {
    const wrapper = shallow(<SearchBar onChangeSearch={onChangeSearchValue} />);
    expect(wrapper.prop('loading')).toEqual(defaultSearchProp.loading);
    wrapper.setProps({ loading: true });
  });
  it('calls onSearch method of input with searchValue value is equal "input value" when onSearch action fires', () => {
    const wrapper = shallow(<SearchBar onChangeSearch={onChangeSearchValue} />);
    const onSearch = wrapper.prop('onSearch');
    const onSearchChange: Function = onSearch as Function;
    onSearchChange('input value', null);
    expect(onSearchChange).toHaveBeenCalled();
    expect(onSearchChange).toHaveBeenCalledWith('input value', null);
  });
});
