import React from 'react';
import { shallow } from 'enzyme';
import SiteManagementListTable from './SiteManagementListTable';
import { Sorting } from 'src/types/Sorting';
import { SiteManagementInfo } from 'src/types/SiteManagementInfo';

it('renders without crashing', () => {
    const sorting: Sorting<SiteManagementInfo> = {
        field: 'ID',
        order: 'ascend'
    };

    shallow(<SiteManagementListTable
        items={[]}
        sorting={sorting}
        onSortingChange={jest.fn}
        onPageSizeChange={jest.fn}
        onPageChange={jest.fn}
        onChangeStatus={jest.fn}
        pageSize={10}
        total={0}
        loading={false}
        page={0}
        disabledTable={false}
        onAction={jest.fn}
    />);
});