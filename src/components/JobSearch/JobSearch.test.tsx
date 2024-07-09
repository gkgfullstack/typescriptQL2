import React from 'react';
import { shallow } from 'enzyme';
import JobSearch from './JobSearch';

describe('JobSearch component ', () => {
  it('render without crashing', () => {
    shallow(<JobSearch />);
  });
});
