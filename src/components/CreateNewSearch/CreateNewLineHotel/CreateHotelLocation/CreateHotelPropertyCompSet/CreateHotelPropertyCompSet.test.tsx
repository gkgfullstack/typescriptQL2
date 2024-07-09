import React from 'react';
import { shallow } from 'enzyme';
import CreateHotelPropertyCompSet from './CreateHotelPropertyCompSet';

describe('CreateHotelPropertyCompSet component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateHotelPropertyCompSet onUpdate={jest.fn} />);
    });
});