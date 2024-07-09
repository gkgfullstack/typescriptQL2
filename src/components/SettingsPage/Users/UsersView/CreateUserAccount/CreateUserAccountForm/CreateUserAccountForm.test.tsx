import React from 'react';
import { shallow } from 'enzyme';
import CreateUserAccountForm from './CreateUserAccountForm';

it('renders without crashing', () => {
    shallow(<CreateUserAccountForm onSave={jest.fn} errorMessage={''} />);
});
