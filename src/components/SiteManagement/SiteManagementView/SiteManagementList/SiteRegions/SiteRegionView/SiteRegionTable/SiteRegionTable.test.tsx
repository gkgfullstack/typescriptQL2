import React from 'react';
import { shallow } from 'enzyme';
import SiteRegionTable from "./SiteRegionTable";

it('renders without crashing', () => {
    const siteId = "1";
    const requestParams = {
        pagesize: 10,
        pagestart: 0
    };
    shallow(<SiteRegionTable
        siteId={siteId}
        onEditRegion={jest.fn}
        requestParams={requestParams}
        setRequestParams={jest.fn}
        onChangeStatus={jest.fn}
    />);
});