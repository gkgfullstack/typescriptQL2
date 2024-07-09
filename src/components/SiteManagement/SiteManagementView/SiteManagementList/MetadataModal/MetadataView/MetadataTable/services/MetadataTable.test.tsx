import { getColumns } from './MetadataTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'name', order: 'asc' };
    const columns = getColumns(sorting);
    expect(columns[0].title).toBe('Metadata Label');
    expect(columns[1].title).toBe('Metadata Name');
    expect(columns[2].title).toBe('Database Table/Field');
    expect(columns[3].title).toBe('Weight');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'asc' };
    const columns = getColumns(sorting);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('label');
    expect(columns[1].key).toBe('name');
    expect(columns[2].key).toBe('tableRef');
    expect(columns[3].key).toBe('weight');
});