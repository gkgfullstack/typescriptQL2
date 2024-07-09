import React from 'react';
import { shallow } from 'enzyme';
import CreateCompetitiveSets from "./CreateCompetitiveSets";

it('renders without crashing', () => {
    shallow(<CreateCompetitiveSets/>);
});