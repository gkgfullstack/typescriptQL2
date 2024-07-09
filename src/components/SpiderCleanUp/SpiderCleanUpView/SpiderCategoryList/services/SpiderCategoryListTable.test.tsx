import { getColumns } from './SpiderCategoryListTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting);
    expect(columns[0].title).toBe('Status');
    expect(columns[1].title).toBe('Category ID');
    expect(columns[2].title).toBe('Category Name');
    expect(columns[3].title).toBe('Full Path');
    expect(columns[4].title).toBe('Num Jobs');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('type');
    expect(columns[1].key).toBe('ID');
    expect(columns[2].key).toBe('name');
    expect(columns[3].key).toBe('full_Path');
    expect(columns[4].key).toBe('jobs');
});