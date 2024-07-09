import React from 'react';
import { shallow } from 'enzyme';
import MatchAttributeMapModal from './MatchAttributeMapModal';

it('renders without crashing', () => {
    const matchAttribute = {};
    const matchAttributeMap = {};

    shallow(<MatchAttributeMapModal
        visible={true}
        matchAttribute={matchAttribute}
        matchAttributeMap={matchAttributeMap}
        setSelectedAttributeMatchMap={jest.fn}
        onUpdate={jest.fn}
        setVisible={jest.fn}
    />);
});