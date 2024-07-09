import React from 'react';
import { shallow } from 'enzyme';
import DiagnosticSearchType from "./DiagnosticSearchType";

it('renders without crashing', () => {
    shallow(<DiagnosticSearchType setParams={jest.fn} loading={false} />);
});