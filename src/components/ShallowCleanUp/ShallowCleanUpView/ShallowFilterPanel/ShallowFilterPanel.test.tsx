import React from 'react';
import { shallow } from 'enzyme';
import ShallowFilterPanel from "./ShallowFilterPanel";

it('renders without crashing', () => {
    shallow(<ShallowFilterPanel schema={undefined} setParams={jest.fn} />);
});