import { getColumns } from './SiteClientsTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting);
    expect(columns[0].title).toBe('Client ID');
    expect(columns[1].title).toBe('Client Name');
    expect(columns[2].title).toBe('Industry');
    expect(columns[3].title).toBe('Vertical');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('ID');
    expect(columns[1].key).toBe('name');
    expect(columns[2].key).toBe('industry');
    expect(columns[3].key).toBe('mwsSchema');
});