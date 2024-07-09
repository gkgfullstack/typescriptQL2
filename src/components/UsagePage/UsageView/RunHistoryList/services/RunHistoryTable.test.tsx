import { getColumns } from './RunHistoryTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'name', order: 'descend' };
    let columns = getColumns(sorting, 'daily', true);
    expect(columns[0].title).toBe('Daily');
    expect(columns[1].title).toBe('Total Inputs');
    expect(columns[2].title).toBe('Total Executed Inputs');
    columns = getColumns(sorting, 'monthly', true);
    expect(columns[0].title).toBe('Monthly');
    columns = getColumns(sorting, 'yearly', true);
    expect(columns[0].title).toBe('Yearly');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting, 'daily', true);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('timePeriod');
    expect(columns[1].key).toBe('total');
    expect(columns[2].key).toBe('exceuted');
});