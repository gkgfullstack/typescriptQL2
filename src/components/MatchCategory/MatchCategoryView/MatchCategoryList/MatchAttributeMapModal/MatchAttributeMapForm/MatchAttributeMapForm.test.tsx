import React from 'react';
import { shallow } from 'enzyme';
import MatchAttributeMapForm from './MatchAttributeMapForm';

it('renders without crashing', () => {
    const matchAttribute = {};
    const matchAttributeMap = {};

    shallow(<MatchAttributeMapForm
        matchAttribute={matchAttribute}
        matchAttributeMap={matchAttributeMap}
        onSave={jest.fn}
    />);
});