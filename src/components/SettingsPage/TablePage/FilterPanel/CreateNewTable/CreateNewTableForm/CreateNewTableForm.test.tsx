import React from 'react';
import { shallow } from 'enzyme';
import CreateNewTableForm from "./CreateNewTableForm";

it('renders without crashing', () => {
    shallow(<CreateNewTableForm
        onSave={jest.fn} setVisible={undefined}    />);
});