import React from 'react';
import { shallow } from 'enzyme';
import FingerprintTable from "./FingerprintTable";

it('renders without crashing', () => {
    const requestParams = {
        pagesize: 10,
        pagestart: 0,
        sortingColumn: 'name',
        sortingOrder: 'desc'
    };
    const site = {
        name: 'name',
        dataSource: 'dataSource',
        productType: 'productType'
    };

    shallow(<FingerprintTable
        schema={'schema'}
        site={site}
        onEditFingerprint={jest.fn}
        requestParams={requestParams}
        setRequestParams={jest.fn}
        onUpdate={jest.fn}
    />);
});