import React from 'react';
import { shallow } from 'enzyme';
import EditDiagnosticModal from "./EditDiagnosticModal";
import RetailDiagnosticInfo from 'src/types/RetailDiagnosticInfo';

it('renders without crashing', () => {
    const maxRun: RetailDiagnosticInfo = {
        ID: 'ID',
        name: 'name'
    };

    shallow(<EditDiagnosticModal
        maxRun={maxRun}
        visible={false}
        setVisible={jest.fn}
        onUpdate={jest.fn}
    />);
});