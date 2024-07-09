import React from 'react';
import { shallow } from 'enzyme';
import RunHistoryTable from './RunHistoryTable';
import { RunHistory } from 'src/types/RunHistory';
import { Sorting } from 'src/types/Sorting';

it('renders without crashing', () => {
    const sorting: Sorting<RunHistory> = {
        field: 'name',
        order: 'ascend'
    };

    shallow(<RunHistoryTable
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
