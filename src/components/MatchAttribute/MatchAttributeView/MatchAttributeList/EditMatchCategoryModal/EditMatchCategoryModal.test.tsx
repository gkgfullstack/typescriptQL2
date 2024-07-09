import React from 'react';
import { shallow } from 'enzyme';
import EditMatchCategoryModal from './EditMatchCategoryModal';

it('renders without crashing', () => {
    const matchCategory = {};

    shallow(<EditMatchCategoryModal
        matchCategory={matchCategory}
        onEdit={jest.fn}
        onUpdate={jest.fn}
        visible={true}
        setVisible={jest.fn}
    />);
});