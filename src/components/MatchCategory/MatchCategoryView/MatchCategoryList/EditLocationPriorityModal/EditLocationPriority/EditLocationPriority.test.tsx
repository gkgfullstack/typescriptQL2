import React from 'react';
import { shallow } from 'enzyme';
import EditLocationPriority from './EditLocationPriority';

it('renders without crashing', () => {
    const matchAttributeMap = {};
    shallow(<EditLocationPriority matchAttributeMap={matchAttributeMap} onSave={jest.fn} />);
});