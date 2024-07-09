import React from 'react';
import { shallow } from 'enzyme';
import UsageView from "./UsageView";

it('renders without crashing', () => {
    shallow(<UsageView />);
});
