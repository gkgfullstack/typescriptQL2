import React from 'react';
import { shallow } from 'enzyme';
import FingerprintModal from "./FingerprintModal";

it('renders without crashing', () => {
    const site = {
        name: 'name',
        dataSource: 'Feed',
        productType: 'type',
    };
    shallow(<FingerprintModal site={site} visible={true} setVisible={jest.fn} />);
});