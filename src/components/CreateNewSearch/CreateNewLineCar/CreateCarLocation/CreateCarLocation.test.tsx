import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateCarLocation from './CreateCarLocation';
import { Button, Input } from 'antd';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateCarLocation component ', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<CreateCarLocation searchType={''} locations={[]} setLocations={jest.fn()} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders 2 <Input /> components', () => {
    expect(wrapper.find(Input)).toHaveLength(2);
  });

  it('First input label is Enter Pickup', () => {
    expect(
      wrapper
        .find(Input)
        .at(0)
        .prop('placeholder')
    ).toBe('Enter Pickup');
  });

  it('Second input label is Enter Return', () => {
    expect(
      wrapper
        .find(Input)
        .at(1)
        .prop('placeholder')
    ).toBe('Enter Return');
  });

  it('renders 1 <Button /> components', () => {
    const deepWrapper = mount(<CreateCarLocation searchType={''} locations={[]} setLocations={jest.fn()} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(deepWrapper.find(Button).text()).toEqual('Add');
  });
});
