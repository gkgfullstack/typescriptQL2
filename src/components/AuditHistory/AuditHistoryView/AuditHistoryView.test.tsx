import React from 'react';
import { shallow } from 'enzyme';
import AuditHistoryView from "./AuditHistoryView";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
        pathname: "test.com",
        search: '',
    }),
    useLocation: () => ({
        pathname: "test.com",
        search: '',
    })
}));

describe('AuditHistoryView component ', () => {
    it('render without crashing', () => {
        shallow(<AuditHistoryView />);
    });
});
