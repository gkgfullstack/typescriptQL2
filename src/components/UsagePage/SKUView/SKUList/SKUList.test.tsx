import React from 'react';
import { shallow } from 'enzyme';
import SKUList from './SKUList';

it('renders without crashing', () => {
    const requestParams = {};

    shallow(<SKUList
        search={''}
        status={''}
        requestParams={requestParams}
        setRequestParams={jest.fn}
    />);
});
