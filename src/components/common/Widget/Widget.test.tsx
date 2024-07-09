import React from 'react';
import { shallow } from 'enzyme';
import Widget from './Widget';

describe('Widget component ', () => {
  it('renders without crashing', () => {
    const children = <div className="children">Child</div>;
    shallow(<Widget>{children}</Widget>);
  });
  it('renders component with children inside widget container', () => {
    const children = <div className="children">Child</div>;
    const wrapper = shallow(<Widget className={'my_container'}>{children}</Widget>);
    expect(wrapper.find('.children')).toHaveLength(1);
  });
  it('renders component with className property that should be added into widget container', () => {
    const children = <div className="children">Child</div>;
    const wrapper = shallow(<Widget className={'my_container'}>{children}</Widget>);
    expect(wrapper.find('.widget').prop('className')).toContain('my_container');
  });
  it('renders component with title when title is defined', () => {
    const children = <div className="children">Child</div>;
    const wrapper = shallow(<Widget title={'My title'}>{children}</Widget>);
    expect(wrapper.find('.widget_header h2').text()).toEqual('My title');
  });
  it('renders component without title when title is not defined', () => {
    const children = <div className="children">Child</div>;
    const wrapper = shallow(<Widget>{children}</Widget>);
    expect(wrapper.find('.widget_header h2')).toHaveLength(0);
  });
  it('renders component with actions when actions are defined', () => {
    const actions = <div className="actions">Some actions</div>;
    const wrapper = shallow(<Widget actions={actions}>Child</Widget>);
    expect(wrapper.find('.widget_header .actions')).toHaveLength(1);
  });
});
