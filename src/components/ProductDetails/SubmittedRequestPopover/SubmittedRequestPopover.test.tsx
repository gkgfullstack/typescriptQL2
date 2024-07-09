import React from 'react';
import { shallow } from 'enzyme';
import SubmittedRequestPopover from './SubmittedRequestPopover';

describe('SubmittedRequestPopover component ', () => {
  it('renders without crashing', () => {
    const children = <div className="children">Child</div>;
    const wrapper = shallow(<SubmittedRequestPopover visible={true}>{children}</SubmittedRequestPopover>);
    expect(wrapper.find('Popover').prop('trigger')).toEqual('click');
  });
  it('renders component with children inside SubmittedRequestPopover container', () => {
    const children = <div className="children">Child</div>;
    const wrapper = shallow(<SubmittedRequestPopover visible={true}>{children}</SubmittedRequestPopover>);
    expect(wrapper.find('Popover').find('.children')).toHaveLength(1);
  });
  it('renders component with visible property that should be added into Popover', () => {
    const wrapper = shallow(<SubmittedRequestPopover visible={true}>Child</SubmittedRequestPopover>);
    expect(wrapper.find('Popover').prop('visible')).toEqual(true);

    wrapper.setProps({ visible: false });
    expect(wrapper.find('Popover').prop('visible')).toEqual(false);
  });
  it('renders component with placement when placement is defined', () => {
    const wrapper = shallow(
      <SubmittedRequestPopover visible={true} placement="bottom">
        Child
      </SubmittedRequestPopover>
    );
    expect(wrapper.find('Popover').prop('placement')).toEqual('bottom');
  });
  it('renders component with placement that equals "top" when placement is not defined', () => {
    const wrapper = shallow(<SubmittedRequestPopover visible={true}>Child</SubmittedRequestPopover>);
    expect(wrapper.find('Popover').prop('placement')).toEqual('top');
  });
  it('renders component with content that contains successful message', () => {
    const wrapper = shallow(<SubmittedRequestPopover visible={true}>Child</SubmittedRequestPopover>);
    const contentWrapper = shallow(<div>{wrapper.find('Popover').prop('content')}</div>);
    expect(contentWrapper.find('p.icon')).toHaveLength(1);
    const message = contentWrapper.find('p:not(.icon)');
    expect(message).toHaveLength(1);
    expect(message.text()).toEqual(
      'Thank you for submitting your request. You will be notified once the change has been made.'
    );
  });
});
