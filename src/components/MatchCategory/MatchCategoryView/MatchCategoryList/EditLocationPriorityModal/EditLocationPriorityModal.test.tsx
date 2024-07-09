import React from 'react';
import { shallow } from 'enzyme';
import EditLocationPriorityModal from './EditLocationPriorityModal';

it('renders without crashing', () => {
    const matchAttributeMap = {};

    shallow(<EditLocationPriorityModal
        visible={true}
        matchAttributeMap={matchAttributeMap}
        onUpdate={jest.fn}
        setVisible={jest.fn}
        setSelectedAttributeMatchMap={jest.fn}
    />);
});