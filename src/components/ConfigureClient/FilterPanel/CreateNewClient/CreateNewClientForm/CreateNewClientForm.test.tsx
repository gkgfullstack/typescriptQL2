import React from 'react';
import { shallow } from 'enzyme';
import CreateNewClientForm from "./CreateNewClientForm";

it('renders without crashing', () => {
    shallow(<CreateNewClientForm
        onSave={jest.fn}
        schemas={[]}
        industries={[]}
    />);
});