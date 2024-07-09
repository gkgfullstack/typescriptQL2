import React from 'react';
import { shallow } from 'enzyme';
import ConfigureClientList from "./ConfigureClientList";

it('renders without crashing', () => {
    shallow(<ConfigureClientList  name={"name"} industry={"industry"} mwsSchema={"mwsSchema"} />);
});
