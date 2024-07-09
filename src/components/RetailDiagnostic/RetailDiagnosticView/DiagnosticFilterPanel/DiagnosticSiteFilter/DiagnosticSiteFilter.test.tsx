import React from 'react';
import { shallow } from 'enzyme';
import DiagnosticSiteFilter from "./DiagnosticSiteFilter";

it('renders without crashing', () => {
    shallow(<DiagnosticSiteFilter
        setParams={jest.fn}
        schema={'schema'}
        loading={true}
    />);
});