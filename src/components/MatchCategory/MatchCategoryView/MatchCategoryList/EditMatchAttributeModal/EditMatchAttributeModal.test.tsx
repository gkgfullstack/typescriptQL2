import React from 'react';
import { shallow } from 'enzyme';
import EditMatchAttributeModal from './EditMatchAttributeModal';

it('renders without crashing', () => {
    const matchAttribute = {};

    shallow(<EditMatchAttributeModal
        visible={true}
        matchAttribute={matchAttribute}
        onUpdate={jest.fn}
        setVisible={jest.fn}
    />);
});