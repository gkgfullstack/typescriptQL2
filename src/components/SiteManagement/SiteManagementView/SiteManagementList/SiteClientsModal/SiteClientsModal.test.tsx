import React from 'react';
import { shallow } from 'enzyme';
import SiteClientsModal from "./SiteClientsModal";

it('renders without crashing', () => {
    const site = {
        name: 'name',
        dataSource: 'Feed',
        productType: 'type',
    };

    shallow(<SiteClientsModal
        site={site}
        visible={false}
        setVisible={jest.fn}
    />);
});