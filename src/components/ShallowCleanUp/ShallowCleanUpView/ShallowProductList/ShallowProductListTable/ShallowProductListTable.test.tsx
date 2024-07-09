import React from 'react';
import { shallow } from 'enzyme';
import ShallowProductListTable from "./ShallowProductListTable";
import {Sorting} from "src/types/Sorting";
import ShallowProductTableInfo from "src/types/ShallowProductTableInfo";

it('renders without crashing', () => {
    const sorting: Sorting<ShallowProductTableInfo> = {
        field: "ID",
        order: "ascend"
    };
    const file = null;

    shallow(<ShallowProductListTable
        items={[]}
        sorting={sorting}
        onSortingChange={jest.fn}
        onPageSizeChange={jest.fn}
        onPageChange={jest.fn}
        onDeleteList={jest.fn}
        pageSize={0}
        totalRecords={0}
        loading={false}
        page={0}
        disabledCleanUp={true}
        onExport={jest.fn}
        file={file}
    />);
});