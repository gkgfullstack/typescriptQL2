import React from 'react';
import { shallow } from 'enzyme';
import MatchAttributeDetailsList from './MatchAttributeDetailsList';

it('renders without crashing', () => {
    const matchAttribute = {};

    shallow(<MatchAttributeDetailsList matchAttribute={matchAttribute} />);
});