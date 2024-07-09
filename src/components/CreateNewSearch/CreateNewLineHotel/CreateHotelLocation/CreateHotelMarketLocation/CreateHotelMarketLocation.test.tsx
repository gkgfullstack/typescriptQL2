import React from 'react';
import { shallow } from 'enzyme';
import CreateHotelMarketLocation from './CreateHotelMarketLocation';

describe('CreateHotelMarketLocation component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateHotelMarketLocation
            onAdd={jest.fn}
            isAddDisabled={false}
        />);
    });
});