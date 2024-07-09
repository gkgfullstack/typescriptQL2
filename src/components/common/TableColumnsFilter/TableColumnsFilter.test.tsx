import React from 'react';
import { shallow } from 'enzyme';
import TableColumnsFilter from "./TableColumnsFilter";

it('renders without crashing', () => {
    shallow(<TableColumnsFilter onChange={jest.fn} defaultColumns={[]} columnOptions={[]} />);
});