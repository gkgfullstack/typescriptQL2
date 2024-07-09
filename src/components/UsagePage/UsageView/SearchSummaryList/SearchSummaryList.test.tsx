import React from 'react';
import { shallow } from 'enzyme';
import SearchSummaryList from './SearchSummaryList';

it('renders without crashing', () => {
    shallow(<SearchSummaryList
        application={''}
        user={''}
        site={''}
        job={''}
        date={''}
    />);
});
