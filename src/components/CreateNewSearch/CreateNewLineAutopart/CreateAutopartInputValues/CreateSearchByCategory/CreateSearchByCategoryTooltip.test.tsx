import React from 'react';
import { shallow } from 'enzyme';
import { CreateSearchByCategoryTooltip } from './CreateSearchByCategoryTooltip';

describe('create tooltips', () => {
  it('renders CreateSearchByCategoryTooltip without crashing', () => {
    shallow(<CreateSearchByCategoryTooltip />);
  });
});
