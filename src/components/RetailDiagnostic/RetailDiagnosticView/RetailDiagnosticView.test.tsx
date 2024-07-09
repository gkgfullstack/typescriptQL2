import React from 'react';
import { shallow } from 'enzyme';
import RetailDiagnosticView from "./RetailDiagnosticView";

it('renders without crashing', () => {
    shallow(<RetailDiagnosticView />);
});