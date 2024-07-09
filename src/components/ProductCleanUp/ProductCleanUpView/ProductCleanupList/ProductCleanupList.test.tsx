import React from 'react';
import { shallow } from 'enzyme';
import ProductCleanupList from "./ProductCleanupList";

it('renders without crashing', () => {
    shallow(<ProductCleanupList
        schema={'schema'}
        site={'site'}
        fingerPrint={'fingerprint'}
        manufacturer={'1'}
    />);
});