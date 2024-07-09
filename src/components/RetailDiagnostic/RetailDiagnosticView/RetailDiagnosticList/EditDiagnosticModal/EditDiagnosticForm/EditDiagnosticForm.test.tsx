import React from 'react';
import { shallow } from 'enzyme';
import RetailDiagnosticInfo from 'src/types/RetailDiagnosticInfo';
import EditDiagnosticForm from "./EditDiagnosticForm";

it('renders without crashing', () => {
    const maxRun: RetailDiagnosticInfo = {
        ID: 'ID',
        name: 'name'
    };

    shallow(<EditDiagnosticForm maxRun={maxRun} onSave={jest.fn} />);
});