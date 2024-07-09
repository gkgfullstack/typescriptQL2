import React from 'react';
import { shallow } from 'enzyme';
import StatusFilter from './StatusFilter';

it('renders without crashing', () => {
    shallow(<StatusFilter setParams={jest.fn()} />);
});
