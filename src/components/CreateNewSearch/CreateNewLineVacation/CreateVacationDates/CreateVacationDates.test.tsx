import React from 'react';
import { shallow } from 'enzyme';
import CreateVacationDates from './CreateVacationDates';

describe('CreateVacationDates component', () => {
    it('renders without crashing', () => {
        shallow(<CreateVacationDates onUpdate={jest.fn} />);
    });
});