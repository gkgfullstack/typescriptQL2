import React from 'react';
import { shallow } from 'enzyme';
import CreateMatchAttribute from './CreateMatchAttribute';

it('renders without crashing', () => {
    shallow(<CreateMatchAttribute setRequestParams={jest.fn} requestParams={{}} />);
});