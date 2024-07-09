import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationAddClientForm from "./ConfigurationAddClientForm";

it('renders without crashing', () => {
    const site = {
        type: "Source"
    };
    const clientId = "1";

    shallow(<ConfigurationAddClientForm
        clientId={clientId}
        site={site}
        openCreateNewSite={jest.fn}
        onSave={jest.fn}
    />);
});