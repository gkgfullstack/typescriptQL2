import React from 'react';
import { shallow } from 'enzyme';
import ShallowProductList from "./ShallowProductList";

it('renders without crashing', () => {
    shallow(<ShallowProductList
        date={"1 month"}
        site={" site name"}
        schema={"schema"}
    />);
});