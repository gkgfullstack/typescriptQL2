import React from 'react';
import { shallow } from 'enzyme';
import EditMetadataModal from "./EditMetadataModal";

it('renders without crashing', () => {
    const site = {
        name: 'name',
        dataSource: 'Feed',
        productType: 'type',
    };
    const metadata = {
        name: 'name',
        weight: '0.9'
    };
    shallow(<EditMetadataModal
        site={site}
        schema={'schema'}
        metadata={metadata}
        visible={false}
        setVisible={jest.fn}
        onUpdate={jest.fn}
    />);
});