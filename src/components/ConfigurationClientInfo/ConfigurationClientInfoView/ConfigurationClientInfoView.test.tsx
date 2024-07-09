import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationClientInfoView from "./ConfigurationClientInfoView";
import {Action} from "history";
import history from "react-router";

let useHistory: jest.Mock;
const historyMock = {
    replace: jest.fn(),
    length: 0,
    location: {
        pathname: 'test.com',
        search: '',
        hash: '',
        state: null,
        key: '',
    },
    push: jest.fn(),
    go: jest.fn(),
    action: 'REPLACE' as Action,
    goBack: jest.fn(),
    goForward: jest.fn(),
    block: jest.fn(),
    listen: jest.fn(),
    createHref: jest.fn(),
};

beforeEach(() => {
    useHistory = jest.spyOn(history, 'useHistory') as jest.Mock;
    useHistory.mockReturnValueOnce(historyMock);
});
afterEach(() => {
    useHistory.mockRestore();
});

it('renders without crashing', () => {
    shallow(<ConfigurationClientInfoView />);
});