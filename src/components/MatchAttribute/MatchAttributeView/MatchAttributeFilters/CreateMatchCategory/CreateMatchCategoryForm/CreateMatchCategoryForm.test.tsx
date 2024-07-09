import React from 'react';
import { shallow } from 'enzyme';
import CreateMatchCategoryForm from './CreateMatchCategoryForm';

it('renders without crashing', () => {
    shallow(<CreateMatchCategoryForm onSave={jest.fn} />);
});