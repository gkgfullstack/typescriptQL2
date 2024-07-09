import React from 'react';
import { shallow } from 'enzyme';
import DeleteConfirmationForm from "./DeleteConfirmationForm";

it('renders without crashing', () => {
    shallow(<DeleteConfirmationForm setPassword={jest.fn} />);
});