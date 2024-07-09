import React from 'react';
import { shallow } from 'enzyme';
import SiteSummaryTable from './SiteSummaryTable';
import { SiteUsageSummary } from 'src/types/SiteUsageSummary';
import { Sorting } from 'src/types/Sorting';

it('renders without crashing', () => {
    const sorting: Sorting<SiteUsageSummary> = {
        field: 'name',
        order: 'ascend'
    };

    shallow(<SiteSummaryTable
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
        isInputVisible={true}
    />);
});
