import React from 'react';
import { shallow } from 'enzyme';
import SiteFilter from "./SiteFilter";

it('renders without crashing', () => {
    shallow(<SiteFilter setParams={jest.fn} schema={'schema'} />);
});