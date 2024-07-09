import React from 'react';
import { shallow } from 'enzyme';
import SiteManagementEditSite from './SiteManagementEditSite';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

it('renders without crashing', () => {
    const site: SiteManagementInfo = {
        name: 'name',
        dataSource: 'Feed File',
        productType: 'type'
    };

    shallow(<SiteManagementEditSite
        site={site}
        schema={'schema'}
        onUpdate={jest.fn}
        visible={false}
        setVisible={jest.fn}
    />);
});