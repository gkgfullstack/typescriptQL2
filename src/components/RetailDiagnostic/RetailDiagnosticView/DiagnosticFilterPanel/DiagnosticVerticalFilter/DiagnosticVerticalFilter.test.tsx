import React from 'react';
import { shallow } from 'enzyme';
import DiagnosticVerticalFilter from "./DiagnosticVerticalFilter";

it('renders without crashing', () => {
    shallow(<DiagnosticVerticalFilter setParams={jest.fn} />);
});