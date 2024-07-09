import React from 'react';
import { shallow } from 'enzyme';
import EditUserAccount from './EditUserAccount';

it('renders without crashing', () => {
    const userAccount = {
        name: 'name'
    };

    shallow(<EditUserAccount
        onUpdate={jest.fn}
        visible={false}
        setVisible={jest.fn}
        userAccount={userAccount}
    />);
});
