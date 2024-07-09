import React from 'react';
import { shallow } from 'enzyme';
import MatchAttributeView from "./MatchAttributeView";

it('renders without crashing', () => {
    shallow(<MatchAttributeView />);
});