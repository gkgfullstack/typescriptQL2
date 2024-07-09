import React from 'react';
import { shallow } from 'enzyme';
import ConfigureClientListTable from "./ConfigureClientListTable";

it('renders without crashing', () => {
    shallow(<ConfigureClientListTable
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
        onChangeStatus={jest.fn}
    />);
});