import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationNewClientSite from "./ConfigurationNewClientSite";

it('renders without crashing', () => {
    const site = {
        type: "Source"
    };
    const clientId = "1";

    shallow(<ConfigurationNewClientSite
        clientId={clientId}
        site={site}
        onUpdate={jest.fn}
        visible={true}
        setVisible={jest.fn}
    />);
});