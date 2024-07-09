import React from 'react';
import { shallow } from 'enzyme';
import TablePageListTable from "./TablePageListTable";

it('renders without crashing', () => {
    shallow(<TablePageListTable
        items={[]}
        sorting={{
            field: "name",
            order: "ascend"
        }}
        onSortingChange={jest.fn}
        onPageSizeChange={jest.fn}
        onPageChange={jest.fn}
        pageSize={10}
        total={0}
        loading={false}
        page={0}
        onChangeStatus={jest.fn} editRecord={undefined}    />);
});