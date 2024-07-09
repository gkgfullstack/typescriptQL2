import React from 'react';
import { shallow } from 'enzyme';
import UserAccountFilter from './UserAccountFilter';

it('renders without crashing', () => {
    shallow(<UserAccountFilter setParams={jest.fn} userDisabledCount={'0'} />);
});
