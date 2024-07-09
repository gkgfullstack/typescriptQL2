import React from 'react';
import { shallow } from 'enzyme';
import CreateMatchCategory from './CreateMatchCategory';

it('renders without crashing', () => {
    const requestParams = {};

    shallow(<CreateMatchCategory
        requestParams={requestParams}
        setRequestParams={jest.fn}
    />);
});