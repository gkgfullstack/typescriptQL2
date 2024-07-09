import React from 'react';
import { shallow } from 'enzyme';
import DeleteConfirmation from "./DeleteConfirmation";

it('renders without crashing', () => {
    shallow(<DeleteConfirmation
        schema={'schema'}
        deletedGroup={undefined}
        visible={false}
        setVisible={jest.fn}
        setDeletedGroup={jest.fn}
        onUpdate={jest.fn}
    />);
});