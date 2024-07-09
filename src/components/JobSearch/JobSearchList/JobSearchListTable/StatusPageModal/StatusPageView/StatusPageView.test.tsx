import React from 'react';
import { shallow } from 'enzyme';
import StatusPageView from "./StatusPageView";

it('renders without crashing', () => {
    shallow(<StatusPageView runId={'22058627'} />);
});