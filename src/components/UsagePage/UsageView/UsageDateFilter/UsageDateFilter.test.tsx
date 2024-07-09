import React from 'react';
import { shallow } from 'enzyme';
import UsageDateFilter from './UsageDateFilter';

it('renders without crashing', () => {
    shallow(<UsageDateFilter
        onUpdate={jest.fn}
        isReset={false}
        setReset={jest.fn}
    />);
});
