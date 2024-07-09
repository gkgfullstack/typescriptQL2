import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationSourceSitesTable from "./ConfigurationSourceSitesTable";

it('renders without crashing', () => {
    const clientId = "1";
    const requestParams = {
        size: 0,
        offset: 0,
        sourcesite: 0
    };

    shallow(<ConfigurationSourceSitesTable
        clientId={clientId}
        onEditSite={jest.fn}
        requestParams={requestParams}
        setRequestParams={jest.fn}
        onChangeStatus={jest.fn}
        onUpdatePrimaryStatus={jest.fn}
        onRegionView={jest.fn}
    />);
});