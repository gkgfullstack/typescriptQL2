import React from 'react';
import { shallow } from 'enzyme';
import EditMatchAttributeForm from './EditMatchAttributeForm';

it('renders without crashing', () => {
    const matchAttribute = {};

    shallow(<EditMatchAttributeForm
        matchAttribute={matchAttribute}
        onSave={jest.fn}
    />);
});