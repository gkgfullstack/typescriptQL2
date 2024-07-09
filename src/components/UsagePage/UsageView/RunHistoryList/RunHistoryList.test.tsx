import React from 'react';
import { shallow } from 'enzyme';
import RunHistoryList from './RunHistoryList';

it('renders without crashing', () => {
    shallow(<RunHistoryList
        application={''}
        user={''}
        site={''}
        job={''}
        date={''}
    />);
});
