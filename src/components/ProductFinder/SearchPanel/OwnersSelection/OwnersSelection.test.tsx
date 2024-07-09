import React from 'react';
import { shallow } from 'enzyme';
import OwnersSelection from './OwnersSelection';
import useOwnersFetch from './hooks/useOwnersFetch';
import Owner from 'src/types/Owner';
import { FetchState } from 'src/reducers/fetchReducer';

jest.mock('./hooks/useOwnersFetch');

const owners: Owner[] = [
  {
    id: '1',
    name: 'Amazon',
    isDefault: false,
  },
  {
    id: '2',
    name: 'Ebay',
    isDefault: true,
  },
];
const getProps = () => {
  return {
    value: '1',
    onChange: jest.fn(),
  };
};
const getOwnersFetchResults = (loading = false, data: Owner[] | null = owners): [FetchState<Owner[]>] => {
  return [
    {
      loading: loading,
      data: data,
      error: null,
    } as FetchState<Owner[]>,
  ];
};

const useOwnersFetchMock = useOwnersFetch as jest.Mock;

describe('OwnersSelection component ', () => {
  beforeEach(() => {
    useOwnersFetchMock.mockReturnValue(getOwnersFetchResults());
  });
  afterEach(() => {
    useOwnersFetchMock.mockRestore();
  });
  it('renders without crashing', () => {
    shallow(<OwnersSelection />);
  });
  it('renders Select with default parameters', () => {
    const wrapper = shallow(<OwnersSelection {...getProps()} />);
    const component = wrapper.find('Select');
    expect(component).toHaveLength(1);
    expect(component.prop('placeholder')).toEqual('Select Owner');
    expect(component.prop('loading')).toBeDefined();
    expect(component.prop('value')).toBeDefined();
    expect(component.prop('disabled')).toBeDefined();
    expect(component.prop('onChange')).toBeDefined();
    const option = component.find('Option');
    expect(option).toHaveLength(2);
    expect(option.at(0).prop('value')).toEqual(owners[0].id);
    expect(
      option
        .at(0)
        .children()
        .text()
    ).toEqual(owners[0].name);
  });
  it('renders Select with loading that is set to true when data is loading', () => {
    const results = getOwnersFetchResults();
    results[0].loading = true;
    useOwnersFetchMock.mockReturnValue(results);
    const wrapper = shallow(<OwnersSelection {...getProps()} />);
    const component = wrapper.find('Select');
    expect(component.prop('loading')).toEqual(true);
  });
  it('renders Select with loading that is set to false when data is loaded', () => {
    const results = getOwnersFetchResults();
    results[0].loading = false;
    useOwnersFetchMock.mockReturnValue(results);
    const wrapper = shallow(<OwnersSelection {...getProps()} />);
    const component = wrapper.find('Select');
    expect(component.prop('loading')).toEqual(false);
  });
  it('renders Select with value that is set to component prop value when value is defined and exist in loaded data', () => {
    const results = getOwnersFetchResults();
    useOwnersFetchMock.mockReturnValue(results);
    const props = getProps();
    const wrapper = shallow(<OwnersSelection {...props} />);
    const component = wrapper.find('Select');
    expect(component.prop('value')).toEqual(props.value);
  });
  it('renders Select with value that is set to undefined when value is defined and does not exist in loaded data', () => {
    const results = getOwnersFetchResults();
    useOwnersFetchMock.mockReturnValue(results);
    const props = getProps();
    props.value = '5';
    const wrapper = shallow(<OwnersSelection {...props} />);
    const component = wrapper.find('Select');
    expect(component.prop('value')).toEqual(undefined);
  });
  it('renders Select with value that is set to undefined when value is defined and data is loading', () => {
    const results = getOwnersFetchResults();
    results[0].loading = true;
    useOwnersFetchMock.mockReturnValue(results);
    const props = getProps();
    const wrapper = shallow(<OwnersSelection {...props} />);
    const component = wrapper.find('Select');
    expect(component.prop('value')).toEqual(undefined);
  });
  it('renders Select with value that is set to undefined when value is defined and there is any error', () => {
    const results = getOwnersFetchResults();
    results[0].error = 'Something went wrong';
    useOwnersFetchMock.mockReturnValue(results);
    const props = getProps();
    const wrapper = shallow(<OwnersSelection {...props} />);
    const component = wrapper.find('Select');
    expect(component.prop('value')).toEqual(undefined);
  });
  it('renders Select with value that is set to undefined when value is not defined and data is loaded', () => {
    const results = getOwnersFetchResults();
    results[0].error = 'Something went wrong';
    useOwnersFetchMock.mockReturnValue(results);
    const props = getProps();
    const wrapper = shallow(<OwnersSelection {...props} value={undefined} />);
    const component = wrapper.find('Select');
    expect(component.prop('value')).toEqual(undefined);
  });
  it('renders Select with disabled that is set to true when there is any error', () => {
    const results = getOwnersFetchResults();
    results[0].error = 'Something went wrong';
    useOwnersFetchMock.mockReturnValue(results);
    const props = getProps();
    const wrapper = shallow(<OwnersSelection {...props} />);
    const component = wrapper.find('Select');
    expect(component.prop('disabled')).toEqual(true);
  });
  it('renders Select with disabled that is set to false when there is no any error', () => {
    const results = getOwnersFetchResults();
    useOwnersFetchMock.mockReturnValue(results);
    const props = getProps();
    const wrapper = shallow(<OwnersSelection {...props} />);
    const component = wrapper.find('Select');
    expect(component.prop('disabled')).toEqual(false);
  });
  it('renders Select with error classname when there is any error', () => {
    const results = getOwnersFetchResults();
    results[0].error = 'Something went wrong';
    useOwnersFetchMock.mockReturnValue(results);
    const props = getProps();
    const wrapper = shallow(<OwnersSelection {...props} />);
    const component = wrapper.find('Select');
    expect(component.prop('className')).toContain('error');
  });
  it('renders Select without error classname when there is no error', () => {
    const results = getOwnersFetchResults();
    useOwnersFetchMock.mockReturnValue(results);
    const props = getProps();
    const wrapper = shallow(<OwnersSelection {...props} />);
    const component = wrapper.find('Select');
    expect(component.prop('className')).not.toContain('error');
  });
  it('calls onChange method Select component with value when Select fires onChange', () => {
    const props = getProps();
    const onChangeSpy = jest.spyOn(props, 'onChange');
    const wrapper = shallow(<OwnersSelection {...props} />);
    const component = wrapper.find('Select');
    const onChange: Function = component.prop('onChange') as Function;
    onChange('2');
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toHaveBeenCalledWith('2');
  });
});
