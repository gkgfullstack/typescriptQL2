import React from 'react';
import { shallow } from 'enzyme';
import CreateMatchAttributeForm from './CreateMatchAttributeForm';

it('renders without crashing', () => {
    shallow(<CreateMatchAttributeForm onSave={jest.fn} />);
});