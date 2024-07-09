import React from 'react';
import { shallow } from 'enzyme';
import SKUTable from './SKUTable';
import SKUInfo from 'src/types/SKU_Info';
import {Sorting} from 'src/types/Sorting';

it('renders without crashing', () => {
    const sorting: Sorting<SKUInfo> = {
        field: "productName",
        order: "ascend"
    };

    shallow(<SKUTable
        items={[]}
        sorting={sorting}
        onSortingChange={jest.fn}
        onPageSizeChange={jest.fn}
        onPageChange={jest.fn}
        pageSize={0}
        total={0}
        loading={false}
        page={0}
        onExport={jest.fn}
    />);
});
