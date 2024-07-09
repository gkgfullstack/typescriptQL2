import React from 'react';
import { shallow } from 'enzyme';
import SiteInfo from "./SiteInfo";

it('renders without crashing', () => {
    const site = {
        name: "site name",
        ID: '1',
        active: 1,
        dataSource: 'Feed',
        productType: '',
    };
    shallow(<SiteInfo site={site} schema={'schema'} />);
});