import React from 'react';
import { shallow } from 'enzyme';
import CreateNewSearch from './CreateNewSearch';
import history from "react-router";
import {Action} from "history";

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

describe('CreateNewSearch component', () => {
    beforeEach(() => {
        useHistory = jest.spyOn(history, 'useHistory') as jest.Mock;
        useHistory.mockReturnValueOnce(historyMock);
    });

    afterEach(() => {
        useHistory.mockRestore();
    });

    it('renders without crashing', () => {
        jest.spyOn(history, 'useHistory').mockReturnValue(historyMock);

        shallow(<CreateNewSearch
            values={null}
            onSubmit={jest.fn()}
        />);
    });
});