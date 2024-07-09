import React from 'react';
import { shallow } from 'enzyme';
import SiteSearch from "./SiteSearch";

it('renders without crashing', () => {
    shallow(<SiteSearch onChangeSearch={jest.fn} value={''} />);
});