import React from 'react';
import { shallow } from 'enzyme';
import SiteRegionModal from "./SiteRegionModal";

it('renders without crashing', () => {
    const site = {
        name: "site name"
    };
    const region = {
        name: "region name"
    };

    shallow(<SiteRegionModal
        site={site}
        region={region}
        schema={"schema"}
        visible={true}
        setVisible={jest.fn}
        onUpdate={jest.fn}
    />);
});