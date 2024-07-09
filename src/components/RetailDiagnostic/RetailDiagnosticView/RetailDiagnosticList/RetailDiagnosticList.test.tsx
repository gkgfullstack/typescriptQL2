import React from 'react';
import { shallow } from 'enzyme';
import RetailDiagnosticList from "./RetailDiagnosticList";

it('renders without crashing', () => {
    shallow(<RetailDiagnosticList schema={'schema'} sites={'site'} setLoading={jest.fn} />);
});