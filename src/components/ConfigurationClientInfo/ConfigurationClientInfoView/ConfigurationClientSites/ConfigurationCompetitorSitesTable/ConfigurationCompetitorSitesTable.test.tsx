import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationCompetitorSitesTable from "./ConfigurationCompetitorSitesTable";

it('renders without crashing', () => {
    const clientId = "1";
    const requestParams = {
        size: 0,
        offset: 0,
        sourcesite: 1
    };

    shallow(<ConfigurationCompetitorSitesTable
        clientId={clientId}
        onEditSite={jest.fn}
        requestParams={requestParams}
        setRequestParams={jest.fn}
        onChangeStatus={jest.fn}
        onRegionView={jest.fn}
    />);
});