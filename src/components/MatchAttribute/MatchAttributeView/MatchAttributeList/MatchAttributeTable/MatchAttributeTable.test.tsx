import React from 'react';
import { shallow } from 'enzyme';
import MatchAttributeTable from './MatchAttributeTable';
import MatchCategoryInfo from 'src/types/MatchCategoryInfo';
import {Sorting} from 'src/types/Sorting';

it('renders without crashing', () => {
    const sorting: Sorting<MatchCategoryInfo> = {
        field: 'name',
        order: 'descend'
    };

    shallow(<MatchAttributeTable
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