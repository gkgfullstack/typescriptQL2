import React from 'react';
import { shallow } from 'enzyme';
import AuditTableView from "./AuditTableView";

it('renders without crashing', () => {
    // const site = {
    //     name: 'name',
    //     dataSource: 'Feed',
    //     productType: 'type',
    // };
    shallow(<AuditTableView  requestParams={{}}  />);
});