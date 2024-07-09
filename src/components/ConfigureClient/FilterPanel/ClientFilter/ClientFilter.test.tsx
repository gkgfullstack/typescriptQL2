import React from 'react';
import { shallow } from 'enzyme';
import ClientFilter from "./ClientFilter";

it('renders without crashing', () => {
    shallow(<ClientFilter
        onChange={jest.fn}
        placeholder={""}
        options={[]}
    />);
});