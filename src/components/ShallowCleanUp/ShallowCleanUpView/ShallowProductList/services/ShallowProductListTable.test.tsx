import { getColumns } from './ShallowProductListTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting);
    expect(columns[0].title).toBe('Site Name');
    expect(columns[1].title).toBe('Total Records');
    expect(columns[2].title).toBe('Outdated Records');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('siteName');
    expect(columns[1].key).toBe('totalRecords');
    expect(columns[2].key).toBe('outdatedRecords');
});