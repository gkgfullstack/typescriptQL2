import React from 'react';
import { shallow } from 'enzyme';
import AuditHistoryFilters from "./AuditHistoryFilters";

it('renders without crashing', () => {
    shallow(<AuditHistoryFilters onUpdate={jest.fn} />);
});
