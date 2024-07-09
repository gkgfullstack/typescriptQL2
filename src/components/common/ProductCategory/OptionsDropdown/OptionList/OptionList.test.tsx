import React from 'react';
import { shallow } from 'enzyme';
import OptionList, { OptionListProps } from './OptionList';
import { Option } from '../reducers/optionsDropdownReducer';

const optionsInfo: Option[] = [
  {
    value: '1234',
    label: 'Auto',
    hasChildren: true,
  },
  {
    value: '3456',
    label: 'Accessories',
    hasChildren: false,
  },
];

const getProps = (options: Option[] = optionsInfo): OptionListProps => {
  return {
    options: options,
    onExpand: jest.fn,
    onChange: jest.fn,
  };
};

describe('OptionList component ', () => {
  it('renders without crashing', () => {
    const props = getProps();
    shallow(<OptionList {...props} />);
  });

  it('renders option list', () => {
    const props = getProps();
    const wrapper = shallow(<OptionList {...props} />);
    expect(wrapper.find('.options')).toHaveLength(1);
    expect(wrapper.find('.option')).toHaveLength(2);
    const optionLabels = wrapper.find('.option_label');
    expect(optionLabels).toHaveLength(2);
    expect(optionLabels.at(0).text()).toEqual(optionsInfo[0].label);
    expect(optionLabels.at(1).text()).toEqual(optionsInfo[1].label);
  });
  it('renders option with class name "expanded" when option marks as expanded', () => {
    const props = getProps();
    props.options![0].expanded = true;
    const wrapper = shallow(<OptionList {...props} />);
    expect(
      wrapper
        .find('.option')
        .first()
        .prop('className')
    ).toContain('expanded');
  });
  it('renders option without class name "expanded" when option marks as not-expanded', () => {
    const props = getProps();
    props.options![0].expanded = false;
    const wrapper = shallow(<OptionList {...props} />);
    expect(
      wrapper
        .find('.option')
        .first()
        .prop('className')
    ).not.toContain('expanded');
  });
  it('renders option with class name "selected" when option marks as selected', () => {
    const props = getProps();
    props.options![0].selected = true;
    const wrapper = shallow(<OptionList {...props} />);
    expect(
      wrapper
        .find('.option')
        .first()
        .prop('className')
    ).toContain('selected');
  });
  it('renders option without class name "selected" when option marks as not-selected', () => {
    const props = getProps();
    props.options![0].selected = false;
    const wrapper = shallow(<OptionList {...props} />);
    expect(
      wrapper
        .find('.option')
        .first()
        .prop('className')
    ).not.toContain('selected');
  });
  it('renders option with class name "checked" when option marks as checked', () => {
    const props = getProps();
    props.options![0].checked = true;
    const wrapper = shallow(<OptionList {...props} />);
    expect(
      wrapper
        .find('.option')
        .first()
        .prop('className')
    ).toContain('checked');
  });
  it('renders option without class name "checked" when option marks as not-checked', () => {
    const props = getProps();
    props.options![0].checked = false;
    const wrapper = shallow(<OptionList {...props} />);
    expect(
      wrapper
        .find('.option')
        .first()
        .prop('className')
    ).not.toContain('selected');
  });
  it('renders option with check icon when option marks as checked', () => {
    const props = getProps();
    props.options![0].checked = true;
    const wrapper = shallow(<OptionList {...props} />);
    expect(wrapper.find('.option .checked_icon')).toHaveLength(1);
  });
  it('renders option without check icon when option marks as not-checked', () => {
    const props = getProps();
    props.options![0].checked = false;
    const wrapper = shallow(<OptionList {...props} />);
    expect(wrapper.find('.option .checked_icon')).toHaveLength(0);
  });
  it('renders option with expand icon when option has children and data is loaded', () => {
    const props = getProps();
    const wrapper = shallow(<OptionList {...props} />);
    expect(wrapper.find('.option .option_expand_icon')).toHaveLength(1);
  });
  it('renders option without expand icon when option has not children or has children and data is loading', () => {
    const props = getProps();
    props.options![0].loading = true;
    const wrapper = shallow(<OptionList {...props} />);
    expect(wrapper.find('.option .option_expand_icon')).toHaveLength(0);

    wrapper.setProps({ options: [{ ...optionsInfo[0], loading: false, hasChildren: false }] });
    expect(wrapper.find('.option .option_expand_icon')).toHaveLength(0);
  });
  it('renders option with loading icon when option has children and data is loading', () => {
    const props = getProps();
    props.options![0].loading = true;
    const wrapper = shallow(<OptionList {...props} />);
    expect(wrapper.find('.option .option_loading_icon')).toHaveLength(1);
  });
  it('renders option without loading icon when option has children and data is loaded or has not children', () => {
    const props = getProps();
    props.options![0].loading = false;
    const wrapper = shallow(<OptionList {...props} />);
    expect(wrapper.find('.option .option_loading_icon').at(0)).toHaveLength(0);

    wrapper.setProps({ options: [{ ...optionsInfo[0], hasChildren: false }] });
    expect(wrapper.find('.option .option_expand_icon')).toHaveLength(0);
  });
  it('calls onChange component prop with new selected option when label fires onClick event', () => {
    const props = getProps();
    const onChangeSpy = jest.spyOn(props, 'onChange');
    const wrapper = shallow(<OptionList {...props} />);
    const onChange: Function = wrapper
      .find('.option_label')
      .at(0)
      .prop('onClick') as Function;
    onChange();
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toHaveBeenCalledWith(optionsInfo[0]);
  });
  it('calls onExpand component prop with new expanded option when expand icon fires onClick event', () => {
    const props = getProps();
    const onExpandSpy = jest.spyOn(props, 'onExpand');
    const wrapper = shallow(<OptionList {...props} />);
    const onChange: Function = wrapper
      .find('.option_expand_icon')
      .at(0)
      .prop('onClick') as Function;
    onChange();
    expect(onExpandSpy).toHaveBeenCalled();
    expect(onExpandSpy).toHaveBeenCalledWith(optionsInfo[0]);
  });
});
