import React from 'react';
import { shallow } from 'enzyme';
import MultiSelectionList from './MultiSelectionList';

const defData = [
  {
    label: 'Value 1',
    value: 'value',
  },
];
const event = {
  currentTarget: {
    value: 'default search',
  },
};
const defValue = ['value'];

const defaultProps = {
  onSearch: jest.fn(),
  onChange: jest.fn(),
  data: defData,
  loading: false,
  defaultValue: defValue,
};

describe('MultiSelectionList component ', () => {
  it('renders without crashing', () => {
    shallow(<MultiSelectionList {...defaultProps} />);
  });
  it('renders CheckboxGroup when MultiSelectionList component props are defined', () => {
    const wrapper = shallow(<MultiSelectionList {...defaultProps} />);
    const spin = wrapper.find('Spin');
    const checkboxGroup = wrapper.find('CheckboxGroup');
    const checkbox = wrapper.find('Checkbox');
    expect(spin).toHaveLength(1);
    expect(checkboxGroup).toHaveLength(1);
    expect(checkbox).toHaveLength(1);
    expect(spin.prop('spinning')).toEqual(defaultProps.loading);
    expect(checkboxGroup.prop('defaultValue')).toEqual(defaultProps.defaultValue);
    expect(checkbox.prop('value')).toEqual(defData[0].value);
    expect(checkbox.prop('children')).toEqual(defData[0].label);
  });
  it('renders Spin when MultiSelectionList component prop loading changing to "true"', () => {
    const wrapper = shallow(<MultiSelectionList {...defaultProps} />);
    let spin = wrapper.find('Spin');
    expect(spin).toHaveLength(1);
    expect(spin.prop('spinning')).toEqual(defaultProps.loading);
    wrapper.setProps({ loading: true });
    spin = wrapper.find('Spin');
    expect(spin.prop('spinning')).toEqual(true);
  });
  it('calls Search component method onChange with search value is equal "default search"', () => {
    const onSearchSpy = jest.spyOn(defaultProps, 'onSearch');
    const wrapper = shallow(<MultiSelectionList {...defaultProps} />); 
    let search = wrapper.find('Search');
    expect(search).toHaveLength(1);
    const handleSearch: Function = search.prop('onChange') as Function;
    handleSearch(event);
    expect(onSearchSpy).toHaveBeenCalled();
    expect(onSearchSpy).toBeCalledWith(event.currentTarget.value);
  });
  it('calls CheckboxGroup component method onChange with defaultValue prop when are defined', () => {
    const onChangeSpy = jest.spyOn(defaultProps, 'onChange');
    const wrapper = shallow(<MultiSelectionList {...defaultProps} />);
    let checkbox = wrapper.find('CheckboxGroup');
    expect(checkbox).toHaveLength(1);
    const onChange: Function = checkbox.prop('onChange') as Function;
    onChange(defValue);
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toBeCalledWith(defValue);
  });
  it('renders "No items found" message when fires method onChange with search value and there is no items found', () => {
    const onSearchSpy = jest.spyOn(defaultProps, 'onSearch');
    const wrapper = shallow(<MultiSelectionList {...defaultProps} data={[]} />);
    let search = wrapper.find('Search');
    expect(search).toHaveLength(1);
    const handleSearch: Function = search.prop('onChange') as Function;
    handleSearch({
      currentTarget: {
        value: 'test',
      },
    });
    expect(onSearchSpy).toHaveBeenCalled();
    expect(onSearchSpy).toBeCalledWith('test');
    expect(wrapper.find('.checkbox_group_wrapper').children().text()).toEqual('No items found')
  });
});
