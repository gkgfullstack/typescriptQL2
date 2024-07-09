import { getColumns } from './SiteSummaryTable.service';

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'name', order: 'descend' };
    const columns = getColumns(sorting, true);
    expect(columns[0].title).toBe('Vertical');
    expect(columns[1].title).toBe('Site Code');
    expect(columns[2].title).toBe('Site Name');
    expect(columns[3].title).toBe('% Total Inputs');
    expect(columns[4].title).toBe('Total Inputs');
    expect(columns[5].title).toBe('% Total Executed Inputs');
    expect(columns[6].title).toBe('Total Executed Inputs');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting, true);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('appName');
    expect(columns[1].key).toBe('siteCode');
    expect(columns[2].key).toBe('siteName');
    expect(columns[3].key).toBe('totalResultPercent');
    expect(columns[4].key).toBe('totalResult');
    expect(columns[5].key).toBe('totalExecResultPercent');
    expect(columns[6].key).toBe('totalExecResult');
});