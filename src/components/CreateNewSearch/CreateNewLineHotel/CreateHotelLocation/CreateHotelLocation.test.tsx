import React from 'react';
import { shallow } from 'enzyme';
import CreateHotelLocation from './CreateHotelLocation';

describe('CreateHotelLocation component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateHotelLocation onUpdate={jest.fn} />);
    });
});