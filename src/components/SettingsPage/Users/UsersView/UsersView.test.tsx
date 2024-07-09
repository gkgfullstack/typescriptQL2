import React from 'react';
import { shallow } from 'enzyme';
import UsersView from "./UsersView";

it('renders without crashing', () => {
    shallow(<UsersView />);
});
