import React from 'react';
import { shallow } from 'enzyme';
import RetailDiagnostic from "./RetailDiagnostic";

it('renders without crashing', () => {
    shallow(<RetailDiagnostic />);
});