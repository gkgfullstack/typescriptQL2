import React from 'react';
import { shallow } from 'enzyme';
import { GeoTooltip } from "./CreateNewLineAutopartTooltip";

describe('create tooltips', () => {
    it('renders GeoTooltip without crashing', () => {
        shallow(<GeoTooltip />);
    });
});