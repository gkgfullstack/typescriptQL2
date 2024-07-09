import { getColumns } from './SKUTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'productName', order: 'descend' };
    const columns = getColumns(sorting);
    expect(columns[0].title).toBe('Product Name');
    expect(columns[1].title).toBe('Unique ID');
    expect(columns[2].title).toBe('Insert Timestamp');
    expect(columns[3].title).toBe('Update Timestamp');
    expect(columns[4].title).toBe('Update By');
    expect(columns[5].title).toBe('Current Status');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'productName', order: 'ascend' };
    const columns = getColumns(sorting);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('productName');
    expect(columns[1].key).toBe('productSku');
    expect(columns[2].key).toBe('inserted');
    expect(columns[3].key).toBe('updated');
    expect(columns[4].key).toBe('updatedBy');
    expect(columns[5].key).toBe('status');
});