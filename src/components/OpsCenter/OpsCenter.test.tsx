import React from 'react';
import { shallow } from 'enzyme';
import OpsCenter from './OpsCenter';

it('renders without crashing', () => {
    shallow(<OpsCenter />);
});
