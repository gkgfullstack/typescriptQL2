import { getColumns } from './services/StatusPageTable.service';


it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'id', order: 'descend' };
    const columns = getColumns(sorting, {isAdminMode:true, isAppAdmin: true});
    expect(columns.length > 0).toBe(true);
    expect(columns[0].title).toBe('Work Unit');
    expect(columns[1].title).toBe('Script');
    expect(columns[2].title).toBe('Status');
    expect(columns[3].title).toBe('Priority');
    expect(columns[4].title).toBe('Started');
    expect(columns[5].title).toBe('Completed');
    expect(columns[6].title).toBe('Duration');
    expect(columns[7].title).toBe('Files');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'id', order: 'ascend' };
    const columns = getColumns(sorting, {isAdminMode:true, isAppAdmin: true});
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('id');
    expect(columns[1].key).toBe('script');
    expect(columns[2].key).toBe('status');
    expect(columns[3].key).toBe('priority');
    expect(columns[4].key).toBe('started');
    expect(columns[5].key).toBe('completed');
    expect(columns[6].key).toBe('duration');
    expect(columns[7].key).toBe('files');

});