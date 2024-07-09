import React from 'react';
import { shallow } from 'enzyme';
import SortByFilter from './SortByFilter';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';

jest.mock('src/hooks/useQueryUrlParams');
jest.mock('src/hooks/useQueryUrlParamsDispatch');

const DEFAULT_OPTIONS = [
  { label: 'Product Name: A to Z', value: 'name-ascend' },
  { label: 'Product Name: Z to A', value: 'name-descend' },
];

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useHistory: (): {} => ({}),
  useLocation: (): {} => ({}),
}));

const useQueryUrlParamsMock = useQueryUrlParams as jest.Mock;
const useQueryUrlParamsDispatchMock = useQueryUrlParamsDispatch as jest.Mock;

let props = {
  onSelect: jest.fn(),
  defaultOptions: DEFAULT_OPTIONS,
};
describe('SortByFilter component ', () => {
  let setQuery = jest.fn();
  let useEffect: jest.Mock;
  const mockUseEffect = (): void => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    useQueryUrlParamsDispatchMock.mockReturnValue(setQuery);
    useQueryUrlParamsMock.mockReturnValue({});
    useEffect = jest.spyOn(React, 'useEffect') as jest.Mock;
    mockUseEffect();
  });
  afterEach(() => {
    useEffect.mockRestore();
  });
  afterAll(() => {
    useQueryUrlParamsDispatchMock.mockRestore();
  });
  it('renders without crashing', () => {
    shallow(<SortByFilter {...props} />);
  });
  it('renders Accordion component with default header value', () => {
    const wrapper = shallow(<SortByFilter {...props} />);
    const view = wrapper.find('Accordion');
    expect(view).toHaveLength(1);
    expect(view.prop('header')).toEqual('Sort By');
  });
  it('renders Accordion panel when header value is defined and RadioGroupList is render', () => {
    const wrapper = shallow(<SortByFilter {...props} header="SORTING" />);
    const accordion = wrapper.find('Accordion');
    expect(accordion).toHaveLength(1);
    expect(accordion.prop('header')).toEqual('SORTING');
    const view = accordion.find('RadioGroupList');
    expect(view).toHaveLength(1);
  });
  it('renders RadioGroupList component with default props', () => {
    const wrapper = shallow(<SortByFilter {...props} />);
    const accordion = wrapper.find('Accordion');
    const view = accordion.find('RadioGroupList');
    expect(view).toHaveLength(1);
    expect(view.prop('value')).toEqual(DEFAULT_OPTIONS[0].value);
    expect(view.prop('defaultValue')).toEqual(DEFAULT_OPTIONS[0].value);
    expect(view.prop('options')).toEqual(DEFAULT_OPTIONS);
    expect(view.prop('onChange')).toBeDefined();
  });
  it('renders RadioGroupList component when defaultOptions prop are defined', () => {
    const wrapper = shallow(<SortByFilter {...props} defaultOptions={[{ label: 'test', value: 'value-test' }]} />);
    const accordion = wrapper.find('Accordion');
    const view = accordion.find('RadioGroupList');
    expect(view).toHaveLength(1);
    expect(view.prop('value')).toEqual('value-test');
    expect(view.prop('defaultValue')).toEqual('value-test');
    expect(view.prop('options')).toEqual([{ label: 'test', value: 'value-test' }]);
  });
  it('renders RadioGroupList component with updated value and default value when sortingcolumn and sortingorder from useQueryUrlParams hook are defined', () => {
    useQueryUrlParamsMock.mockReturnValue({
      sortingcolumn: 'name',
      sortingorder: 'descend',
      back:false
    })
    const wrapper = shallow(<SortByFilter {...props} />);
    const accordion = wrapper.find('Accordion');
    const view = accordion.find('RadioGroupList');
    expect(view).toHaveLength(1);
    expect(view.prop('value')).toEqual('name-descend');
    expect(view.prop('defaultValue')).toEqual('name-descend');
    expect(view.prop('options')).toEqual(DEFAULT_OPTIONS);
  });
  it('calls RadioGroupList component method onSelect with changing value when onChange with "name-descend" value fires', () => {
    const onSortBySelectSpy = jest.spyOn(props, 'onSelect');
    const wrapper = shallow(<SortByFilter {...props} />);
    const accordion = wrapper.find('Accordion');
    const view = accordion.find('RadioGroupList');
    expect(view.prop('value')).toEqual('name-ascend');
    const onChange: Function = view.prop('onChange') as Function;
    onChange('name-descend');
    expect(onSortBySelectSpy).toHaveBeenCalled();
    expect(onSortBySelectSpy).toBeCalledWith('sort', { sortingcolumn: 'name', sortingorder: 'descend', back:false });
  });
});
