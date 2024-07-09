import React from 'react';
import { shallow } from 'enzyme';
import SiteManagementConfirmation from './SiteManagementConfirmation';

it('renders without crashing', () => {
    const record = {
        ID: '1'
    };
    shallow(<SiteManagementConfirmation   record={record} onAction={jest.fn} />);
});