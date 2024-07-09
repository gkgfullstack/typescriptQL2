import { getColumns } from './ConfigurationSiteRegionTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting, jest.fn);
    expect(columns[0].title).toBe('Region Name');
    expect(columns[1].title).toBe('Region ID');
    expect(columns[2].title).toBe('City');
    expect(columns[3].title).toBe('State');
    expect(columns[4].title).toBe('Zip Code');
    expect(columns[5].title).toBe('Country');
    expect(columns[6].title).toBe('Active');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting, jest.fn);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('name');
    expect(columns[1].key).toBe('ID');
    expect(columns[2].key).toBe('city');
    expect(columns[3].key).toBe('state');
    expect(columns[4].key).toBe('zipCode');
    expect(columns[5].key).toBe('country');
    expect(columns[6].key).toBe('active');
});