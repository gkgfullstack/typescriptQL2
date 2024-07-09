import React from 'react';
import { shallow } from 'enzyme';
import EditFingerprintModal from "./EditFingerprintModal";

it('renders without crashing', () => {
    const site = {
        name: 'name',
        dataSource: 'Feed',
        productType: 'type',
    };
    const fingerprint = {
        name: 'name'
    };
    shallow(<EditFingerprintModal
        schema={'schema'}
        site={site}
        fingerprint={fingerprint}
        visible={true}
        setVisible={jest.fn}
        onUpdate={jest.fn}
    />);
});