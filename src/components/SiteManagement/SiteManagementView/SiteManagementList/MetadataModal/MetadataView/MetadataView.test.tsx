import React from 'react';
import { shallow } from 'enzyme';
import MetadataView from "./MetadataView";

it('renders without crashing', () => {
    const site = {
        name: 'name',
        dataSource: 'Feed',
        productType: 'type',
    };
    shallow(<MetadataView site={site} />);
});