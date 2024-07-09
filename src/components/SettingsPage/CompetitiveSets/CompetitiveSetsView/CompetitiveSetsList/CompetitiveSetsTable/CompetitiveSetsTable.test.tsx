import React from 'react';
import { shallow } from 'enzyme';
import { Sorting } from 'src/types/Sorting';
import { CompetitiveSetInfo } from 'src/types/CompetitiveSetInfo';
import CompetitiveSetsTable from "./CompetitiveSetsTable";

it('renders without crashing', () => {
    const sorting: Sorting<CompetitiveSetInfo> = {
        field: "name",
        order: "ascend"
    };

    shallow(<CompetitiveSetsTable
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
