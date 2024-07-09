import React from 'react';
import { shallow } from 'enzyme';
import CreateUserAccount from './CreateUserAccount';

it('renders without crashing', () => {
    shallow(<CreateUserAccount onUpdate={jest.fn} />);
});
