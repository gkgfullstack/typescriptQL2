import { getColumns } from './FingerprintTable.service';

it('should be correct titles of getColumns method', () => {
    const columns = getColumns();
    expect(columns[0].title).toBe('Name');
});

it('should be correct keys of getColumns method', () => {
    const columns = getColumns();
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('name');
});