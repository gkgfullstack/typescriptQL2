import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationAddClientSite from "./ConfigurationAddClientSite";

it('renders without crashing', () => {
    const clientId = "1";
    const site = {
      type: "Source"
    };

    shallow(<ConfigurationAddClientSite
        clientId={clientId}
        site={site}
        onUpdate={jest.fn}
        visible={true}
        setClientVisible={jest.fn}
        setNewClientVisible={jest.fn}
    />);
});