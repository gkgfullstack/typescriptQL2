import { getColumns } from './ConfigurationSourceSitesTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting, jest.fn, jest.fn);
    expect(columns[0].title).toBe('Site Name');
    expect(columns[1].title).toBe('Site ID');
    expect(columns[2].title).toBe('Data Source');
    expect(columns[3].title).toBe('Product Type');
    expect(columns[4].title).toBe('Bookmark Created');
    expect(columns[5].title).toBe('Regions');
    expect(columns[6].title).toBe('Primary Source');
});

it('should be correct results of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting, jest.fn, jest.fn);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('name');
    expect(columns[1].key).toBe('ID');
    expect(columns[2].key).toBe('dataSource');
    expect(columns[3].key).toBe('productType');
    expect(columns[4].key).toBe('bookmarkCreated');
    expect(columns[5].key).toBe('region');
    expect(columns[6].key).toBe('sourcesite');
});