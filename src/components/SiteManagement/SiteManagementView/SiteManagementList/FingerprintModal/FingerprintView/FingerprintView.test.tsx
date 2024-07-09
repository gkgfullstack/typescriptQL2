import React from 'react';
import { shallow } from 'enzyme';
import FingerprintView from "./FingerprintView";

it('renders without crashing', () => {
    const site = {
        name: 'name',
        dataSource: 'Feed',
        productType: 'type',
    };
    shallow(<FingerprintView site={site} />);
});