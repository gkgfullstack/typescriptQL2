import React from 'react';
import { shallow } from 'enzyme';
import AuditTableTable from "./AuditTableTable";

it('renders without crashing', () => {
    shallow(<AuditTableTable setVisible={false} />);
});