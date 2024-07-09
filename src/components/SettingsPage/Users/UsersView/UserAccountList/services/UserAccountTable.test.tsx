import {  getColumns } from './UserAccountTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting, jest.fn);
    expect(columns[0].title).toBe('Account Name');
    expect(columns[1].title).toBe('Last Login');
    expect(columns[2].title).toBe('Last Password Change');
    expect(columns[3].title).toBe('Status');
    expect(columns[4].title).toBe('Actions');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting, jest.fn);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('accountName');
    expect(columns[1].key).toBe('lastLogin');
    expect(columns[2].key).toBe('lastPasswordChange');
    expect(columns[3].key).toBe('enableAccount');
    expect(columns[4].key).toBe('actions');
});