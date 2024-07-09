import {  getColumns } from 'src/components/SettingsPage/CompetitiveSets/CompetitiveSetsView/CompetitiveSetsList/services/CompetitiveSetsTable.service';
import {Sorting} from 'src/types/Sorting';
import {CompetitiveSetInfo} from 'src/types/CompetitiveSetInfo';

it('should be correct titles of getColumns method', () => {
    const sorting: Sorting<CompetitiveSetInfo> | null = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting, jest.fn);
    expect(columns[0].title).toBe('Competitive Set Name');
    expect(columns[1].title).toBe('Count of property IDs');
    expect(columns[2].title).toBe('Action');
});

it('should be correct keys of getColumns method', () => {
    const sorting: Sorting<CompetitiveSetInfo> | null= { field: 'name', order: 'descend' };
    const columns = getColumns(sorting, jest.fn);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('name');
    expect(columns[1].key).toBe('countPropIDs');
    expect(columns[2].key).toBe('action');
});