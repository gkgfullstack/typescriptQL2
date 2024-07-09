import React from 'react';
import { shallow } from 'enzyme';
import TableSearch from "./TableSearch";

it('renders without crashing', () => {
    shallow(<TableSearch
        placeholder={"placeholder"}
        defaultValue={""}
        value={"value"}
        loading={false}
        onChangeSearch={jest.fn}
    />);
});