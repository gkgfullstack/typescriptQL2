import React from 'react';
import { shallow } from 'enzyme';
import DataEditor from "./DataEditor";

it('renders without crashing', () => {
    shallow(<DataEditor />);
});