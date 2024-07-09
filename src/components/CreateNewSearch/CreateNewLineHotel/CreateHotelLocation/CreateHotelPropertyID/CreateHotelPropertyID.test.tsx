import React from 'react';
import { shallow } from 'enzyme';
import CreateHotelPropertyID from './CreateHotelPropertyID';

describe('CreateHotelPropertyID component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateHotelPropertyID
            onAdd={jest.fn}
        />);
    });
});