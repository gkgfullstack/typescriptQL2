import React from 'react';
import { shallow } from 'enzyme';
import RetailDiagnosticTable from "./RetailDiagnosticTable";
import {Sorting} from "src/types/Sorting";
import RetailDiagnosticInfo from "src/types/RetailDiagnosticInfo";

it('renders without crashing', () => {
    const sorting = { field: 'completeTimestamp', order: 'descend' } as Sorting<RetailDiagnosticInfo>;

    shallow(<RetailDiagnosticTable
        items={[]}
        sorting={sorting}
        onSortingChange={jest.fn}
        onPageSizeChange={jest.fn}
        onPageChange={jest.fn}
        pageSize={10}
        total={0}
        loading={false}
        page={0}
        disabledMaxRuns={true}
        onAction={jest.fn}
        selectedColumns={[]}
    />);
});