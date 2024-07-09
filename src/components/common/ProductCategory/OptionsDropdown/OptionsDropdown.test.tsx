import React, { Dispatch, MutableRefObject } from 'react';
import { shallow } from 'enzyme';
import OptionsDropdown, { OptionsDropdownProps } from './OptionsDropdown';
import useOptionsDropdownState, { State } from './hooks/useOptionsDropdownState';
import { Option, Action, OPTIONS_DROPDOWN_ACTION_TYPES } from './reducers/optionsDropdownReducer';

jest.mock('./hooks/useOptionsDropdownState');

const optionsInfo: Option[] = [
  {
    value: '1234',
    label: 'Auto',
    hasChildren: true,
  },
  {
    value: '3456',
    label: 'Accessories',
    hasChildren: true,
    children: [
      {
        value: '987',
        label: 'Accessories 1',
        hasChildren: true,
        children: [
          {
            value: '3928',
            label: 'Accessories 2',
            hasChildren: true,
          },
        ],
      },
    ],
  },
];

const getProps = (): OptionsDropdownProps => {
  return {
    value: ['1234'],
    onChange: jest.fn,
    error: '',
    loadData: jest.fn,
    options: optionsInfo,
    placeholder: 'Categories',
  };
};

const useOptionsDropdownStateMock = useOptionsDropdownState as jest.Mock;
const dispatch = jest.fn();

const getOptionsState = (): [State, Dispatch<Action>] => {
  return [
    {
      ref: { current: null } as MutableRefObject<HTMLDivElement | null>,
      selectedOptions: [],
      expandedOptions: [],
      displayedOptions: [],
      isOverlayVisible: false,
      options: [],
      initialSetupFinished: true,
      value: [],
    } as State,
    dispatch,
  ];
};

describe('OptionsDropdown component ', () => {
  let useEffect: jest.Mock;
  const mockUseEffect = (): void => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    /* mocking useEffect */
    useEffect = jest.spyOn(React, 'useEffect') as jest.Mock;
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
  });
  afterEach(() => {
    useOptionsDropdownStateMock.mockRestore();
    useOptionsDropdownStateMock.mockRestore();
    useEffect.mockRestore();
    useEffect.mockRestore();
    useEffect.mockRestore();
    useEffect.mockRestore();
  });
  it('renders without crashing', () => {
    const props = getProps();
    delete props.value;
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const dropdownPicker = wrapper.find('.dropdown_picker');
    expect(dropdownPicker).toHaveLength(1);
  });
  it('renders dropdown picker with "open" class name when overlay is visible', () => {
    const state = getOptionsState();
    state[0].isOverlayVisible = true;
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...getProps()} />);
    const dropdownPicker = wrapper.find('.dropdown_picker');
    expect(dropdownPicker.prop('className')).toContain('open');
  });
  it('renders dropdown picker without "open" class name when overlay is not visible', () => {
    const state = getOptionsState();
    state[0].isOverlayVisible = false;
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...getProps()} />);
    const dropdownPicker = wrapper.find('.dropdown_picker');
    expect(dropdownPicker.prop('className')).not.toContain('open');
  });
  it('renders dropdown picker with "error" class name when there is an error', () => {
    const props = getProps();
    props.error = 'Something went wrong!';
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const dropdownPicker = wrapper.find('.dropdown_picker');
    expect(dropdownPicker.prop('className')).toContain('error');
  });
  it('renders dropdown picker without "open" class name when there is no error', () => {
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...getProps()} />);
    const dropdownPicker = wrapper.find('.dropdown_picker');
    expect(dropdownPicker.prop('className')).not.toContain('error');
  });
  it('renders dropdown container with placeholder when there is no selected value', () => {
    const props = getProps();
    useOptionsDropdownStateMock.mockReturnValue(getOptionsState());
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const dropdown = wrapper.find('.dropdown_picker .dropdown_container');
    expect(dropdown).toHaveLength(1);
    expect(dropdown.find('.dropdown_label').text()).toEqual(props.placeholder);
  });
  it('renders dropdown container with selected value when selected value is defined', () => {
    const state = getOptionsState();
    state[0].selectedOptions = [optionsInfo[1], optionsInfo[1].children![0]];
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...getProps()} />);
    const dropdown = wrapper.find('.dropdown_picker .dropdown_container');
    expect(dropdown).toHaveLength(1);
    expect(dropdown.find('.dropdown_label').text()).toEqual(optionsInfo[1].children![0].label);
  });
  it('renders dropdown container with dropdown arrow up down when overlay is not visible', () => {
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...getProps()} />);
    const icon = wrapper.find('.dropdown_container .dropdown_icon');
    expect(icon).toHaveLength(1);
    expect(icon.find('.dropdown_arrow_icon')).toHaveLength(1);
    expect(icon.find('.dropdown_arrow_icon').prop('icon')).toEqual(['fas', 'caret-down']);
  });
  it('renders dropdown container with dropdown arrow down icon when overlay is visible', () => {
    const state = getOptionsState();
    state[0].isOverlayVisible = true;
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...getProps()} />);
    const icon = wrapper.find('.dropdown_container .dropdown_icon');
    expect(icon).toHaveLength(1);
    expect(icon.find('.dropdown_arrow_icon')).toHaveLength(1);
    expect(icon.find('.dropdown_arrow_icon').prop('icon')).toEqual(['fas', 'caret-down']);
  });
  it('renders dropdown container with dropdown clear icon when selected value is defined ', () => {
    const props = getProps();
    const state = getOptionsState();
    state[0].selectedOptions = [optionsInfo[0]];
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const icon = wrapper.find('.dropdown_container .dropdown_icon');
    expect(icon).toHaveLength(1);
    expect(icon.find('.dropdown_clear_icon')).toHaveLength(1);
  });
  it('calls dispatch to clear data and onChange with empty value when selected value is defined and clear icon fires click event', () => {
    const props = getProps();
    const onChangeSpy = jest.spyOn(props, 'onChange');
    const state = getOptionsState();
    state[0].selectedOptions = [optionsInfo[0]];
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const icon = wrapper.find('.dropdown_clear_icon');
    const onClick: Function = icon.prop('onClick') as Function;
    onClick(new Event('click'));
    expect(dispatch).toHaveBeenCalledWith({ type: OPTIONS_DROPDOWN_ACTION_TYPES.clearSelection });
    expect(onChangeSpy).toHaveBeenCalledWith([]);
  });
  it('renders dropdown container without dropdown clear icon when selected value is not defined ', () => {
    const props = getProps();
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const icon = wrapper.find('.dropdown_container .dropdown_icon');
    expect(icon).toHaveLength(1);
    expect(icon.find('.dropdown_clear_icon')).toHaveLength(0);
  });
  it('calls dispatch to set overlay visibility to opposite value when dropdown container fires click event', () => {
    useOptionsDropdownStateMock.mockReturnValueOnce(getOptionsState());
    let wrapper = shallow(<OptionsDropdown {...getProps()} />);
    let onClick: Function = wrapper.find('.dropdown_container').prop('onClick') as Function;
    onClick();
    expect(dispatch).toHaveBeenCalledWith({ type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility, payload: true });

    const state = getOptionsState();
    state[0].isOverlayVisible = true;
    useOptionsDropdownStateMock.mockReturnValueOnce(state);
    wrapper = shallow(<OptionsDropdown {...getProps()} />);
    onClick = wrapper.find('.dropdown_container').prop('onClick') as Function;
    onClick();
    expect(dispatch).toHaveBeenCalledWith({ type: OPTIONS_DROPDOWN_ACTION_TYPES.setOverlayVisibility, payload: false });
  });
  it('renders dropdown overlay container', () => {
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...getProps()} />);
    expect(wrapper.find('.dropdown_picker .dropdown_overlay_container')).toHaveLength(1);
    expect(wrapper.find('.dropdown_overlay_container .dropdown_overlay')).toHaveLength(1);
    expect(wrapper.find('.dropdown_overlay .dropdown_scrollable_container')).toHaveLength(1);
    expect(wrapper.find('.dropdown_scrollable_container .dropdown_options')).toHaveLength(1);
  });
  it('renders dropdown overlay container with OptionList component inside when displayed options are defined', () => {
    const props = getProps();
    props.value = [];
    const state = getOptionsState();
    state[0].displayedOptions = [optionsInfo];
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const options = wrapper.find('.dropdown_options OptionList');
    expect(options).toHaveLength(1);
    expect(options.prop('options')).toEqual(optionsInfo);
    expect(options.prop('onChange')).toBeDefined();
    expect(options.prop('onExpand')).toBeDefined();
  });
  it('renders dropdown overlay container with several OptionList component inside when displayed options are defined and has a several levels', () => {
    const props = getProps();
    const state = getOptionsState();
    state[0].displayedOptions = [optionsInfo, optionsInfo[1].children || []];
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const options = wrapper.find('.dropdown_options OptionList');
    expect(options).toHaveLength(2);
    expect(options.at(0).prop('options')).toEqual(optionsInfo);
    expect(options.at(1).prop('options')).toEqual(optionsInfo[1].children);
  });
  it('renders dropdown overlay container without OptionList component inside when displayed options are not defined', () => {
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...getProps()} />);
    expect(wrapper.find('.dropdown_options OptionList')).toHaveLength(0);
  });
  it('renders dropdown overlay container with error message inside overlay container when error is defined', () => {
    const props = getProps();
    props.error = 'Something went wrong';
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const alert = wrapper.find('.dropdown_overlay Alert');
    expect(alert).toHaveLength(1);
    expect(alert.prop('message')).toEqual(props.error);
    expect(alert.prop('type')).toEqual('error');
    expect(alert.prop('showIcon')).toBeDefined();
  });
  it('renders dropdown overlay container with error message inside overlay container when error is defined as object', () => {
    const props = getProps();
    props.error = { message: 'Something went wrong' };
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const alert = wrapper.find('.dropdown_overlay Alert');
    expect(alert).toHaveLength(1);
    expect(alert.prop('message')).toEqual(props.error.message);
    expect(alert.prop('type')).toEqual('error');
    expect(alert.prop('showIcon')).toBeDefined();
  });
  it('renders dropdown overlay container without error message inside overlay container when error is not defined', () => {
    const props = getProps();
    props.error = '';
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    expect(wrapper.find('.dropdown_overlay Alert')).toHaveLength(0);
  });
  it('calls dispatch to set selected options and onChange with new value when option list fires onChange event and new value is not equal current and initial setup is finished', () => {
    const props = getProps();
    const onChangeSpy = jest.spyOn(props, 'onChange');
    const state = getOptionsState();
    state[0].displayedOptions = [optionsInfo];
    state[0].initialSetupFinished = true;
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const selectedItem = optionsInfo[0];
    const onChange: Function = wrapper.find('OptionList').prop('onChange') as Function;
    onChange(selectedItem);
    expect(dispatch).toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.setSelectedOptions,
      payload: { selectedItems: [selectedItem] },
    });
    expect(onChangeSpy).toHaveBeenCalledWith([selectedItem.value]);
  });
  it('does not call dispatch to set selected options and onChange with new value when option list fires onChange event and new value is not equal current and initial setup is not finished', () => {
    const props = getProps();
    const onChangeSpy = jest.spyOn(props, 'onChange');
    const state = getOptionsState();
    const selectedItem = optionsInfo[1];
    state[0].displayedOptions = [optionsInfo];
    state[0].initialSetupFinished = false;
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const onChange: Function = wrapper.find('OptionList').prop('onChange') as Function;
    onChange(selectedItem);
    expect(dispatch).not.toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.setSelectedOptions,
      payload: { selectedItems: [selectedItem] },
    });
    expect(onChangeSpy).not.toHaveBeenCalled();
  });
  it('does not call dispatch to set selected options and onChange with new value when option list fires onChange event and new value is equal current', () => {
    const props = getProps();
    const onChangeSpy = jest.spyOn(props, 'onChange');
    const state = getOptionsState();
    const selectedItem = optionsInfo[1];
    state[0].selectedOptions = [selectedItem];
    state[0].displayedOptions = [optionsInfo];
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const onChange: Function = wrapper.find('OptionList').prop('onChange') as Function;
    onChange(selectedItem);
    expect(dispatch).not.toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.setSelectedOptions,
      payload: { selectedItems: [selectedItem] },
    });
    expect(onChangeSpy).not.toHaveBeenCalled();
  });
  it('calls dispatch to set expanded options when option list fires onExpand event and expanded item is not expanded ', () => {
    const props = getProps();
    const state = getOptionsState();
    state[0].displayedOptions = [optionsInfo];
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const selectedItem = optionsInfo[1];
    const onExpand: Function = wrapper.find('OptionList').prop('onExpand') as Function;
    onExpand(selectedItem);
    expect(dispatch).toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.setExpandedOptions,
      payload: { selectedItem: selectedItem },
    });
  });
  it('does not call dispatch to set expanded options when option list fires onExpand event and expanded item is already expanded ', () => {
    const dispatchProp = jest.fn();
    const props = getProps();
    const state = getOptionsState();
    state[0].displayedOptions = [[{ ...optionsInfo[1], expanded: true }]];
    state[1] = dispatchProp;
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    const selectedItem = { ...optionsInfo[1], expanded: true };
    const onExpand: Function = wrapper.find('OptionList').prop('onExpand') as Function;
    onExpand(selectedItem);
    expect(dispatchProp).not.toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.setExpandedOptions,
      payload: { selectedItem: selectedItem },
    });
  });
  it('calls dispatch to set default value when value and options are defined', () => {
    const props = getProps();
    props.options = optionsInfo;
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    shallow(<OptionsDropdown {...props} />);
    expect(dispatch).toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
      payload: { value: props.value, options: optionsInfo },
    });
  });
  it('does not call dispatch to set default value when value is not defined or options are not defined', () => {
    const dispatchProp = jest.fn();
    const props = getProps();
    props.value = ['1234'];
    props.options = [];
    const state = getOptionsState();
    state[1] = dispatchProp;
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    expect(dispatchProp).not.toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
      payload: { value: props.value, options: [] },
    });

    wrapper.setProps({ value: [], options: [] });
    expect(dispatchProp).not.toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
      payload: { value: [], options: [] },
    });

    wrapper.setProps({ value: [], options: optionsInfo });
    expect(dispatchProp).not.toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.setDefaultValue,
      payload: { value: [], options: optionsInfo },
    });
  });
  it('calls dispatch to update options when options are defined', () => {
    const props = getProps();
    props.options = optionsInfo;
    const state = getOptionsState();
    useOptionsDropdownStateMock.mockReturnValue(state);
    shallow(<OptionsDropdown {...props} />);
    expect(dispatch).toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.updateOptions,
      payload: { options: optionsInfo },
    });
  });
  it('does not call dispatch to update options when options are not defined', () => {
    const dispatchProp = jest.fn();
    const props = getProps();
    props.options = [];
    const state = getOptionsState();
    state[1] = dispatchProp;
    useOptionsDropdownStateMock.mockReturnValue(state);
    shallow(<OptionsDropdown {...props} />);
    expect(dispatchProp).not.toHaveBeenCalledWith({
      type: OPTIONS_DROPDOWN_ACTION_TYPES.updateOptions,
      payload: { options: [] },
    });
  });
  it('calls loadData prop with expanded value when expanded options are defined and there is no children', () => {
    const props = getProps();
    const loadDataSpy = jest.spyOn(props, 'loadData');
    const state = getOptionsState();
    state[0].expandedOptions = [optionsInfo[0]];
    useOptionsDropdownStateMock.mockReturnValue(state);
    shallow(<OptionsDropdown {...props} />);
    expect(loadDataSpy).toHaveBeenCalledWith([optionsInfo[0]]);
  });
  it('does not call loadData prop with expanded value when expanded options are defined and children are defined', () => {
    const props = getProps();
    const loadDataSpy = jest.spyOn(props, 'loadData');
    const state = getOptionsState();
    state[0].expandedOptions = [optionsInfo[1]];
    useOptionsDropdownStateMock.mockReturnValue(state);
    shallow(<OptionsDropdown {...props} />);
    expect(loadDataSpy).not.toHaveBeenCalledWith([optionsInfo[1]]);
  });
  it('calls dispatch to clear data when prop value is set to empty array', () => {
    const props = getProps();
    const state = getOptionsState();
    const dispatchSpy = jest.fn();
    state[1] = dispatchSpy;
    state[0].selectedOptions = [optionsInfo[0]];
    useOptionsDropdownStateMock.mockReturnValue(state);
    shallow(<OptionsDropdown {...props} value={[]} />);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: OPTIONS_DROPDOWN_ACTION_TYPES.clearSelection });
  });
  it('does not call dispatch to clear data when prop value is not empty', () => {
    const props = getProps();
    const state = getOptionsState();
    const dispatchSpy = jest.fn();
    state[1] = dispatchSpy;
    state[0].selectedOptions = [optionsInfo[0]];
    useOptionsDropdownStateMock.mockReturnValue(state);
    shallow(<OptionsDropdown {...props} />);
    expect(dispatchSpy).not.toHaveBeenCalledWith({ type: OPTIONS_DROPDOWN_ACTION_TYPES.clearSelection });
  });
  it('renders No items when there is no displayed items', () => {
    const props = getProps();
    const state = getOptionsState();
    state[0].displayedOptions = [];
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    expect(wrapper.find('.no_items')).toHaveLength(1);
  });
  it('does not render No items when there is any displayed items', () => {
    const props = getProps();
    const state = getOptionsState();
    state[0].displayedOptions = [
      [
        {
          label: 'some',
          value: '',
          loading: false,
          children: [],
          hasChildren: false,
          expanded: false,
          selected: false,
          checked: false,
        },
      ],
    ];
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    expect(wrapper.find('.no_items')).toHaveLength(0);
  });
  it('does not render No items when there is no displayed items and there is any error ', () => {
    const props = getProps();
    props.error = 'something wrong';
    const state = getOptionsState();
    state[0].displayedOptions = [
      [
        {
          label: 'some',
          value: '',
          loading: false,
          children: [],
          hasChildren: false,
          expanded: false,
          selected: false,
          checked: false,
        },
      ],
    ];
    useOptionsDropdownStateMock.mockReturnValue(state);
    const wrapper = shallow(<OptionsDropdown {...props} />);
    expect(wrapper.find('.no_items')).toHaveLength(0);
  });
});
