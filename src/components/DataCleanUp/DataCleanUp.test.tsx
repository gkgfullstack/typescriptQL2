import React from 'react';
import { shallow } from 'enzyme';
import DataCleanUp from './DataCleanUp';

it('renders without crashing', () => {
    shallow(<DataCleanUp />);
});