import React from 'react';
import { shallow } from 'enzyme';
import MatchCategoryFilters from './MatchCategoryFilters';

it('renders without crashing', () => {
    shallow(<MatchCategoryFilters setParams={jest.fn} setRequestParams={jest.fn} requestParams={{}} />);
});