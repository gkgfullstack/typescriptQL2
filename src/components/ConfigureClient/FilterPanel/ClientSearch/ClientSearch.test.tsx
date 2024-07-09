import React from 'react';
import { shallow } from 'enzyme';
import ClientSearch from "./ClientSearch";

it('renders without crashing', () => {
    shallow(<ClientSearch
        placeholder={"placeholder"}
        defaultValue={""}
        value={"value"}
        loading={false}
        onChangeSearch={jest.fn}
    />);
});