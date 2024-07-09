import React from 'react';
import { shallow } from 'enzyme';
import CreateNewSite from "./CreateNewSite";

it('renders without crashing', () => {
    shallow(<CreateNewSite onUpdate={jest.fn} />);
});