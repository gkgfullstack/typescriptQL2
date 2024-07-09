import React from 'react';
import { shallow } from 'enzyme';
import UserAccountTable from './UserAccountTable';
import { Sorting } from 'src/types/Sorting';
import { UserAccountInfo } from 'src/types/UserAccountInfo';

it('renders without crashing', () => {
    const sorting: Sorting<UserAccountInfo> = {
        field: "ID",
        order: "ascend"
    };

    shallow(<UserAccountTable
        items={[]}
        sorting={sorting}
        onSortingChange={jest.fn}
        onPageSizeChange={jest.fn}
        onPageChange={jest.fn}
        pageSize={10}
        total={0}
        loading={false}
        page={0}
        onAction={jest.fn}
    />);
});
