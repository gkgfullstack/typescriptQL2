import { defaultColumns, getColumns} from './MatchAttributeDetailsTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting, defaultColumns, jest.fn);
    expect(columns[0].title).toBe('Owner Name');
    expect(columns[1].title).toBe('Owner Id');
    expect(columns[2].title).toBe('Match Attribute Location');
    expect(columns[3].title).toBe('Raw Attribute Name');
    expect(columns[4].title).toBe('Regex Parse');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting, defaultColumns, jest.fn);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('ownerName');
    expect(columns[1].key).toBe('ownerId');
    expect(columns[2].key).toBe('matchAttributeLocation');
    expect(columns[3].key).toBe('rawAttributeName');
    expect(columns[4].key).toBe('regexParse');
});