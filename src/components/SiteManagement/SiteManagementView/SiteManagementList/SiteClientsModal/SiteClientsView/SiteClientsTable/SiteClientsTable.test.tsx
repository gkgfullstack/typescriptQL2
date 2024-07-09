import React from 'react';
import { shallow } from 'enzyme';
import SiteClientsTable from "./SiteClientsTable";

it('renders without crashing', () => {
    shallow(<SiteClientsTable siteId={'1'} schema={'schema'} />);
});