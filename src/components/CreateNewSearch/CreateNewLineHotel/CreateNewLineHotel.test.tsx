import React from 'react';
import { shallow } from 'enzyme';
import CreateNewLineHotel from './CreateNewLineHotel';

describe('CreateNewLineHotel component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateNewLineHotel
            sites={''}
            specap1={''}
            specap2={''}
            sDateRangeStart={''}
            sDateRangeEnd={''}
            vertical={'vertical'}
            searchName={'searchName'}
        />);
    });
});