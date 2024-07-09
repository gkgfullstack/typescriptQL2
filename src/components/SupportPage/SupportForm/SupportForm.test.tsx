import React from 'react';
import { shallow } from 'enzyme';
import SupportForm from "./SupportForm";

it('renders without crashing', () => {
    shallow(<SupportForm onUpdate={jest.fn}  />);
});