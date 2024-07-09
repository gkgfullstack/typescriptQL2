import React from 'react';
import { shallow } from 'enzyme';
import AddRequestMatch from './AddRequestMatch';

describe('AddRequestMatch component ', () => {
  it('renders without crashing', () => {
    shallow(<AddRequestMatch />);
  });
  it('renders link button "Request Match"', () => {
    const wrapper = shallow(<AddRequestMatch className={'wrapper'} />);
    const button = wrapper.find('Button');
    expect(button).toHaveLength(1);
    expect(button.prop('type')).toEqual('ghost');
    expect(button.find('.icon')).toHaveLength(1);
    expect(button.find('.label').text()).toEqual('Request Match');
  });
  it('renders component with custom class name when className prop is defined ', () => {
    const wrapper = shallow(<AddRequestMatch className={'wrapper'} />);
    const component = wrapper.find('.container');
    expect(component).toHaveLength(1);
    expect(component.prop('className')).toContain('wrapper');
  });
  it('renders AddMatch component with Button inside', () => {
    const wrapper = shallow(<AddRequestMatch />);
    expect(wrapper.find('AddMatch')).toHaveLength(1);
    expect(wrapper.find('AddMatch').find('Button')).toHaveLength(1);
  });
});
