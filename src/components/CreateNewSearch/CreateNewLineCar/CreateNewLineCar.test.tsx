import React from 'react';
import { shallow } from 'enzyme';
import CreateNewLineCar from './CreateNewLineCar';

describe('CreateNewLineCar component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateNewLineCar
            sites={''}
            specap1={''}
            specap2={''}
            sDateRangeStart={''}
            sDateRangeEnd={''}
            vertical={'vertical'}
            searchName={'searchName'}
            addLineItem={jest.fn()}
        />);
    });
});