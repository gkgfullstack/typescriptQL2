import React from 'react';
import { shallow } from 'enzyme';
import MatchCategory from "./MatchCategory";

it('renders without crashing', () => {
    shallow(<MatchCategory />);
});