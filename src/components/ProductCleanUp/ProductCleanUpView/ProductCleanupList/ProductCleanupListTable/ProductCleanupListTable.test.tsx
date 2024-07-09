import React from 'react';
import { shallow } from 'enzyme';
import ProductCleanupListTable from "./ProductCleanupListTable";
import {Sorting} from "src/types/Sorting";
import ProductCleanupTableInfo from 'src/types/ProductCleanupTableInfo';

it('renders without crashing', () => {
    const sorting: Sorting<ProductCleanupTableInfo> = {
        field: "ID",
        order: "ascend"
    };

    shallow(<ProductCleanupListTable
        items={[]}
        sorting={sorting}
        onSortingChange={jest.fn}
        onPageSizeChange={jest.fn}
        onPageChange={jest.fn}
        onMergeList={jest.fn}
        onDifferentiateList={jest.fn}
        pageSize={0}
        totalRecords={0}
        loading={false}
        page={0}
        disabledCleanUp={true}
        setMergedAll={jest.fn}
        setDifferentiateAll={jest.fn}
    />);
});