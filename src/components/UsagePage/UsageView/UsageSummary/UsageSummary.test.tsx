import React from 'react';
import { shallow } from 'enzyme';
import UsageSummary from './UsageSummary';

it('renders without crashing', () => {
    const date = {
        startDate: '',
        endDate: ''
    };

    shallow(<UsageSummary
        onUpdate={jest.fn}
        application={''}
        user={''}
        site={''}
        job={''}
        usageType={''}
        date={date}
    />);
});
