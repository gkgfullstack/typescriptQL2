import React from 'react';
import { shallow } from 'enzyme';
import NoMatchesView from './NoMatchesView';

describe('NoMatchesView component ', () => {
  it('renders without crashing', () => {
    shallow(<NoMatchesView />);
  });
  it('renders text explanation with Request a match now button', () => {
    const wrapper = shallow(<NoMatchesView />);
    const text = wrapper.find('p');
    expect(text).toHaveLength(1);
    expect(text.text()).toEqual('There are no matches for this product yet.');

    const addMatch = wrapper.find('.add_match_request AddMatch');
    expect(addMatch).toHaveLength(1);

    const button = wrapper.find('AddMatch .link');
    expect(button).toHaveLength(1);
    expect(button.prop('type')).toEqual('ghost');
    expect(button.find('.label').text()).toEqual('Request a match now');
    expect(button.find('.icon')).toHaveLength(1);
  });
});
