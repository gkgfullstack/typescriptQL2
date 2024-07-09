import React from 'react';
import { shallow } from 'enzyme';
import ConfigurationDeliveryInfoForm from "./ConfigurationDeliveryInfoForm";

it('renders without crashing', () => {
    const clientId = "1";
    shallow(<ConfigurationDeliveryInfoForm clientId={clientId} />);
});