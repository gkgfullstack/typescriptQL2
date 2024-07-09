import React from 'react';
import { shallow } from 'enzyme';
import TableauReport, { errorMessage } from './TableauReport';

describe('TableauReport component', () => {
  it('renders without crashing', () => {
    shallow(<TableauReport url={''} />);
  });
  it('renders Alert message when urls is empty or tableau is not defined', () => {
    const wrapper = shallow(<TableauReport url={''} />);
    const alert = wrapper.find('Alert');
    expect(alert).toHaveLength(1);
    expect(alert.prop('message')).toEqual('Error');
    expect(alert.prop('description')).toEqual(errorMessage);
    expect(alert.prop('type')).toEqual('error');
  });
  it('renders div with report when url is not empty and tableau is defined', () => {
    window.tableau = { Viz: jest.fn() };
    const wrapper = shallow(<TableauReport url={'http://google.com'} />);
    expect(wrapper.find('div')).toHaveLength(1);
    window.tableau = {};
  });
});
