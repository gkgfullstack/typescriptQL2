import React from 'react';
import { shallow } from 'enzyme';
import Accordion from './Accordion';

const defaultProps = {
  header: 'Accordion label',
  children: <div>Accordion children</div>,
};

describe('Accordion component ', () => {
  it('renders without crashing', () => {
    shallow(<Accordion {...defaultProps} />);
  });
  it('renders when component props is defined', () => {
    const wrapper = shallow(<Accordion {...defaultProps} />);
    let panel = wrapper.find('CollapsePanel');
    expect(wrapper.prop('bordered')).toEqual(false);
    expect(wrapper.prop('expandIconPosition')).toEqual('right');
    expect(wrapper.prop('expandIcon')).toBeDefined();
    expect(panel).toHaveLength(1);
    expect(panel.prop('header')).toEqual(defaultProps.header);
    expect(panel.prop('children')).toEqual(defaultProps.children);
  });
  it('renders Accordion component when header prop is not defined', () => {
    const wrapper = shallow(<Accordion children={defaultProps.children} />);
    let panel = wrapper.find('CollapsePanel');
    expect(panel).toHaveLength(1);
    expect(panel.prop('header')).toBeUndefined();
    expect(panel.prop('children')).toEqual(defaultProps.children);
  });
  it('renders Accordion component with updated header value "Accordion" when header prop is changed', () => {
    const wrapper = shallow(<Accordion { ...defaultProps } />);
    let panel = wrapper.find('CollapsePanel');
    expect(panel).toHaveLength(1);
    expect(panel.prop('header')).toEqual(defaultProps.header);
    expect(panel.prop('children')).toEqual(defaultProps.children);
    wrapper.setProps({ header: 'Accordion' });
    panel = wrapper.find('CollapsePanel');
    expect(panel.prop('header')).toEqual('Accordion');
  });
  it('renders Accordion component when HTML context of children prop changing to "Child"', () => {
    const wrapper = shallow(<Accordion { ...defaultProps } />);
    let panel = wrapper.find('CollapsePanel');
    expect(panel).toHaveLength(1);
    expect(panel.prop('header')).toEqual(defaultProps.header);
    expect(panel.prop('children')).toEqual(defaultProps.children);
    wrapper.setProps({ children: <div>Child</div> });
    panel = wrapper.find('CollapsePanel');
    expect(panel.prop('children')).toEqual(<div>Child</div>);
  });
});
