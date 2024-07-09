import React from 'react';
import { shallow } from 'enzyme';
import SiteVerticalFilter from "./SiteVerticalFilter";
import history from "react-router";

let useHistory: jest.Mock;
const historyMock = {
    push: jest.fn(),
};

beforeEach(() => {
    useHistory = jest.spyOn(history, 'useHistory') as jest.Mock;
    useHistory.mockReturnValueOnce(historyMock);
});
afterEach(() => {
    useHistory.mockRestore();
});

it('renders without crashing', () => {
    shallow(<SiteVerticalFilter setParams={jest.fn} />);
});