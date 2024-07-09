import React from 'react';
import { shallow } from 'enzyme';
import UsageTimeZoneFilter from "./UsageTimeZoneFilter";

it('renders without crashing', () => {
    shallow(<UsageTimeZoneFilter onUpdate={jest.fn()}/>);
});