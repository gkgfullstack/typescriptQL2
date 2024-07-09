import React from 'react';
import { shallow } from 'enzyme';
import MetadataTable from "./MetadataTable";

it('renders without crashing', () => {
    const requestParams = {
        pagesize: 10,
        pagestart: 0,
        sortingColumn: 'name',
        sortingOrder: 'desc'
    };

    shallow(<MetadataTable
        schema={'schema'}
        siteId={'1'}
        onEditMetadata={jest.fn}
        requestParams={requestParams}
        setRequestParams={jest.fn}
        onUpdate={jest.fn}
    />);
});