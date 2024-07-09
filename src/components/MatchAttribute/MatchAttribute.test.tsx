import React from 'react';
import { shallow } from 'enzyme';
import MatchAttribute from "./MatchAttribute";

describe('MatchAttribute component', () => {
    it('renders without crashing', () => {
        shallow(<MatchAttribute />);
    });
});