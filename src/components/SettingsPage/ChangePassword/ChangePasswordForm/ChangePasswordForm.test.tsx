import React from 'react';
import { shallow } from 'enzyme';
import ChangePasswordForm from "./ChangePasswordForm";

it('renders without crashing', () => {
    shallow(<ChangePasswordForm onUpdate={jest.fn}  />);
});