import React from 'react';
import { shallow } from 'enzyme';
import MatchCategoryView from './MatchCategoryView';
import history from 'react-router';

let useHistory: jest.Mock;

const historyMock = {
    goBack: jest.fn(),
};

beforeEach(() => {
    useHistory = jest.spyOn(history, 'useHistory') as jest.Mock;
    useHistory.mockReturnValueOnce(historyMock);
});

afterEach(() => {
    useHistory.mockRestore();
});

it('renders without crashing', () => {
    shallow(<MatchCategoryView />);
});