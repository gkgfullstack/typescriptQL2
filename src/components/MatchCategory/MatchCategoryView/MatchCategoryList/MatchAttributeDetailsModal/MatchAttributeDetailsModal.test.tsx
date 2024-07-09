import React from 'react';
import { shallow } from 'enzyme';
import MatchAttributeDetailsModal from './MatchAttributeDetailsModal';

it('renders without crashing', () => {
    const matchAttribute = {};

    shallow(<MatchAttributeDetailsModal
        visible={true}
        matchAttribute={matchAttribute}
        setVisible={jest.fn}
    />);
});