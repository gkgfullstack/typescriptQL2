import React from 'react';
import { shallow } from 'enzyme';
import DiagnosticSearch from './DiagnosticSearch';

it('renders without crashing', () => {
    shallow(<DiagnosticSearch onChangeSearch={jest.fn} value={''} />);
});