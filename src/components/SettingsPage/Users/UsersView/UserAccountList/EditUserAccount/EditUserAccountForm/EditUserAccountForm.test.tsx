import React from 'react';
import { shallow } from 'enzyme';
import EditUserAccountForm from './EditUserAccountForm';

it('renders without crashing', () => {
    const userAccount = {};

    shallow(<EditUserAccountForm
        onSave={jest.fn}
        errorMessage={''}
        userAccount={userAccount}
    />);
});
