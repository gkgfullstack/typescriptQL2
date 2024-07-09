import React from 'react';
import { shallow } from 'enzyme';
import SiteManagementEditSiteForm from './SiteManagementEditSiteForm';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

it('renders without crashing', () => {
    const site: SiteManagementInfo = {
        name: 'name',
        dataSource: 'Feed File',
        productType: 'type'
    };
    shallow(<SiteManagementEditSiteForm site={site} onSave={jest.fn} />);
});