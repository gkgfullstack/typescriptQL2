import React from 'react';
import { shallow } from 'enzyme';
import EditFingerprintForm from "./EditFingerprintForm";

it('renders without crashing', () => {
    const site = {
        name: 'name',
        dataSource: 'Feed',
        productType: 'type',
    };
    const fingerprint = {
        name: 'name'
    };
    shallow(<EditFingerprintForm
        schema={'schema'}
        site={site}
        fingerprint={fingerprint}
        onSave={jest.fn}
    />);
});