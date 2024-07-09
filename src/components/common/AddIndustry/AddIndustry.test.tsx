import React from 'react';
import { shallow } from 'enzyme';
import AddIndustry from './AddIndustry';

it('renders without crashing', () => {
    shallow(<AddIndustry disabled={false} onUpdateIndustry={jest.fn} />);
});