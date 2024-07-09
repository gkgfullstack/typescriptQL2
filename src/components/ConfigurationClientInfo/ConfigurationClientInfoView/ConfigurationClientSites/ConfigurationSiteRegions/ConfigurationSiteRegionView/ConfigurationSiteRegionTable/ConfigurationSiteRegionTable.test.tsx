import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationSiteRegionTable from "./ConfigurationSiteRegionTable";

it('renders without crashing', () => {
    const clientId = "1";
    const siteId = "1";
    const requestParams = {
        pagesize: 10,
        pagestart: 0
    };
    const schema = 'schema';
    shallow(<ConfigurationSiteRegionTable
        clientId={clientId}
        schema={schema}
        siteId={siteId}
        onEditRegion={jest.fn}
        requestParams={requestParams}
        setRequestParams={jest.fn}
        onChangeStatus={jest.fn}
        openRegionModal={jest.fn}
    />);
});