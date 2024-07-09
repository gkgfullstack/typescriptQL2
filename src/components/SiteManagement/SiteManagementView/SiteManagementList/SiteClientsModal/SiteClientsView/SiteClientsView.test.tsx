import React from 'react';
import { shallow } from 'enzyme';
import SiteClientsView from "./SiteClientsView";

it('renders without crashing', () => {
    const site = {
        name: 'name',
        dataSource: 'Feed',
        productType: 'type',
    };

    shallow(<SiteClientsView site={site} />);
});