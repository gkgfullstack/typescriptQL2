import React from 'react';
import { shallow } from 'enzyme';
import SpiderCategoryListTable from "./SpiderCategoryListTable";
import {Sorting} from "src/types/Sorting";
import SpiderCategoryTableInfo from "src/types/SpiderCategoryTableInfo";

it('renders without crashing', () => {
    const sorting: Sorting<SpiderCategoryTableInfo> = {
        field: "ID",
        order: "ascend"
    };
    const file = null;

    shallow(<SpiderCategoryListTable
        items={[]}
        sorting={sorting}
        onSortingChange={jest.fn}
        onPageSizeChange={jest.fn}
        onPageChange={jest.fn}
        onCleanUpList={jest.fn}
        pageSize={0}
        totalRecords={0}
        loading={false}
        page={0}
        disabledCleanUp={true}
        onExport={jest.fn}
        file={file}
    />);
});