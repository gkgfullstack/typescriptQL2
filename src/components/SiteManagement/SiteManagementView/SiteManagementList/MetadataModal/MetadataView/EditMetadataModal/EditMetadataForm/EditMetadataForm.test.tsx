import React from 'react';
import { shallow } from 'enzyme';
import EditMetadataForm from "./EditMetadataForm";

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
    shallow(<EditMetadataForm
        site={site}
        schema={'schema'}
        metadata={metadata}
        onSave={jest.fn}
    />);
});