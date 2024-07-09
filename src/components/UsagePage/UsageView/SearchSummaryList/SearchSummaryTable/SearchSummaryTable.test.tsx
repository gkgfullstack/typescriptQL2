import React from 'react';
import { shallow } from 'enzyme';
import SearchSummaryTable from './SearchSummaryTable';
import { SearchSummary } from 'src/types/SearchSummary';
import { Sorting } from 'src/types/Sorting';

it('renders without crashing', () => {
    const sorting: Sorting<SearchSummary> = {
        field: 'name',
        order: 'ascend'
    };

    shallow(<SearchSummaryTable
        items={[]}
        sorting={sorting}
        onDisable={() => false}
        onSortingChange={jest.fn}
        onPageSizeChange={jest.fn}
        onPageChange={jest.fn}
        pageSize={10}
        total={0}
        loading={false}
        page={0}
    />);
});
