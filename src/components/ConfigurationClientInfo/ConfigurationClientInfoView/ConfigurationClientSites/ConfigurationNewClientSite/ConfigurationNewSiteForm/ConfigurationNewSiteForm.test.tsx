import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationNewSiteForm from "./ConfigurationNewSiteForm";

it('renders without crashing', () => {
    const site = {
        type: "Source",
        name: "site name",
        dataSource: "Feed File",
        productType: "",
        imageURL: ""
    };

    shallow(<ConfigurationNewSiteForm
        site={site}
        onSave={jest.fn}
    />);
});