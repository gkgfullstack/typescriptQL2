import React from 'react';
import { shallow } from 'enzyme';
import DiagnosticFilterPanel from "./DiagnosticFilterPanel";

it('renders without crashing', () => {
    shallow(<DiagnosticFilterPanel setParams={jest.fn} setSelectedColumns={[]} />);
});