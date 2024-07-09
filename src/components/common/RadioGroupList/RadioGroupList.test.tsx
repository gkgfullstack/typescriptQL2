import React from 'react';
import { shallow } from 'enzyme';
import RadioGroupList from './RadioGroupList';

const DEFAULT_OPTIONS = [{ label: 'Label 1', value: 'value-1', disabled: true }];

const defaultProp = {
  defaultValue: 'def-value',
  value: 'curr-value',
  options: DEFAULT_OPTIONS,
  onChange: jest.fn(),
};

const defRadioChangeEvent = {
  target: {
    value: 'value-1',
  },
};

describe('RadioGroupList component ', () => {
  it('renders without crashing', () => {
    shallow(<RadioGroupList {...defaultProp} />);
  });
  it('renders RadioGroup component with default values and checking this values', () => {
    const wrapper = shallow(<RadioGroupList {...defaultProp} />);
    const view = wrapper.find('RadioGroup');
    expect(view.prop('value')).toEqual(defaultProp.value);
    expect(view.prop('defaultValue')).toEqual(defaultProp.defaultValue);
    expect(view.prop('onChange')).toBeDefined();
  });
  it('renders RadioGroup children component Radio with default values and checking this values', () => {
    const wrapper = shallow(<RadioGroupList {...defaultProp} />);
    const view = wrapper.find('Radio');
    expect(view.prop('value')).toEqual(DEFAULT_OPTIONS[0].value);
    expect(view.prop('disabled')).toEqual(DEFAULT_OPTIONS[0].disabled);
    expect(view.prop('children')).toEqual(DEFAULT_OPTIONS[0].label);
  });
  it('renders RadioGroup component with setting new values and checking this set', () => {
    const wrapper = shallow(<RadioGroupList {...defaultProp} />);
    let view = wrapper.find('RadioGroup');
    let child = view.find('Radio');
    expect(view.prop('value')).toEqual(defaultProp.value);
    expect(view.prop('defaultValue')).toEqual(defaultProp.defaultValue);
    expect(view.prop('onChange')).toBeDefined();
    expect(child.prop('value')).toEqual(DEFAULT_OPTIONS[0].value);
    expect(child.prop('disabled')).toEqual(DEFAULT_OPTIONS[0].disabled);
    expect(child.prop('children')).toEqual(DEFAULT_OPTIONS[0].label);
    wrapper.setProps({
      ...defaultProp,
      defaultValue: 'def-changing-value',
      value: 'curr-changing-value',
      options: [{ label: 'Label 2', value: 'value-2', disabled: false }],
    });
    view = wrapper.find('RadioGroup');
    child = view.find('Radio');
    expect(view.prop('value')).toEqual('curr-changing-value');
    expect(view.prop('defaultValue')).toEqual('def-changing-value');
    expect(view.prop('onChange')).toBeDefined();
    expect(child.prop('value')).toEqual('value-2');
    expect(child.prop('disabled')).toEqual(false);
    expect(child.prop('children')).toEqual('Label 2');
  });
  it('calls onChange method with default value when onChange RadioGroup method fires', () => {
    const onChangeSpy = jest.spyOn(defaultProp, 'onChange');
    const wrapper = shallow(<RadioGroupList {...defaultProp} />);
    const view = wrapper.find('RadioGroup');
    const onChange: Function = view.prop('onChange') as Function;
    onChange(defRadioChangeEvent);
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toHaveBeenCalledWith('value-1');
  });
});
