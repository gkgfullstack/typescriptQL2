import React from 'react';
import { shallow } from 'enzyme';
import UserAccountFilters from './UserAccountFilters';

it('renders without crashing', () => {
    shallow(<UserAccountFilters onUpdate={jest.fn} userDisabledCount={'0'} setParams={jest.fn} />);
});
