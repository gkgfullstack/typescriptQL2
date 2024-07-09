import React from 'react';
import { shallow } from 'enzyme';
import EditMatchCategoryForm from './EditMatchCategoryForm';

it('renders without crashing', () => {
    const matchCategory = {};

    shallow(<EditMatchCategoryForm
        matchCategory={matchCategory}
        onSave={jest.fn}
    />);
});