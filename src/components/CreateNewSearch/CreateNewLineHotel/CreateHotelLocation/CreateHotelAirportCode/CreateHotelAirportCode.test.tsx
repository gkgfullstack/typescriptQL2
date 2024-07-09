import React from 'react';
import { shallow } from 'enzyme';
import CreateHotelAirportCode from './CreateHotelAirportCode';

describe('CreateHotelAirportCode component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateHotelAirportCode
            onAdd={jest.fn}
            isAddDisabled={false}
        />);
    });
});