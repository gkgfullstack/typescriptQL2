import React from 'react';
import { shallow } from 'enzyme';
import MatchAttributeList from './MatchAttributeList';

it('renders without crashing', () => {
    const requestParams = {};

    shallow(<MatchAttributeList
        search={''}
        schema={''}
        requestParams={requestParams}
        setRequestParams={jest.fn}
    />);
});