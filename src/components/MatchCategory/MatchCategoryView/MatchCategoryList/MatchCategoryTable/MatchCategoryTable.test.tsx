import React from 'react';
import { shallow } from 'enzyme';
import MatchCategoryTable from './MatchCategoryTable';
import { Sorting } from 'src/types/Sorting';
import MatchCategoryInfo from 'src/types/MatchCategoryInfo';

it('renders without crashing', () => {
    const sorting: Sorting<MatchCategoryInfo> = {
        field: 'name',
        order: 'descend'
    };

    shallow(<MatchCategoryTable
        items={[]}
        sorting={sorting}
        onSortingChange={jest.fn}
        onPageSizeChange={jest.fn}
        onPageChange={jest.fn}
        pageSize={0}
        total={0}
        loading={false}
        page={0}
        onAction={jest.fn}
    />);
});