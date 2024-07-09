import React from 'react';
import { shallow } from 'enzyme';
import CreateHotelPropertyLocation from './CreateHotelPropertyLocation';

describe('CreateHotelPropertyLocation component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateHotelPropertyLocation
            onAdd={jest.fn}
            isAddDisabled={false}
        />);
    });
});