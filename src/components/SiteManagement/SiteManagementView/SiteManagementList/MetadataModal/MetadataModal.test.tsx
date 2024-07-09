import React from 'react';
import { shallow } from 'enzyme';
import MetadataModal from "./MetadataModal";

it('renders without crashing', () => {
    const site = {
        name: 'name',
        dataSource: 'Feed',
        productType: 'type',
    };
    shallow(<MetadataModal site={site} visible={true} setVisible={jest.fn} />);
});