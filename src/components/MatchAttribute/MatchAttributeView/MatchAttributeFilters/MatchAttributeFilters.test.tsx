import React from 'react';
import { shallow } from 'enzyme';
import MatchAttributeFilters from './MatchAttributeFilters';

it('renders without crashing', () => {
    const requestParams = {};

    shallow(<MatchAttributeFilters
        setParams={jest.fn}
        requestParams={requestParams}
        setRequestParams={jest.fn}
    />);
});