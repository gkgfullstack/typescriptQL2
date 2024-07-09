import React from 'react';
import { shallow } from 'enzyme';
import SettingsForm from "./SettingsForm";

it('renders without crashing', () => {
    shallow(<SettingsForm onUpdate={jest.fn}  />);
});