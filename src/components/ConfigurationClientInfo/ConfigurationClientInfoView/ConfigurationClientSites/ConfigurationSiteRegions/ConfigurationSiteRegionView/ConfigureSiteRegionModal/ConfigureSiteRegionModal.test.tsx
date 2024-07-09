import React from 'react';
import { shallow } from 'enzyme';
import ConfigureSiteRegionModal from "./ConfigureSiteRegionModal";

it('renders without crashing', () => {
    const site = {
        name: "site name"
    };
    const clientId = "1";
    const region = {
        name: "region name"
    };
    const schema = 'schema';

    shallow(<ConfigureSiteRegionModal
        site={site}
        clientId={clientId}
        region={region}
        schema={schema}
        visible={true}
        setVisible={jest.fn}
        onUpdate={jest.fn}
    />);
});