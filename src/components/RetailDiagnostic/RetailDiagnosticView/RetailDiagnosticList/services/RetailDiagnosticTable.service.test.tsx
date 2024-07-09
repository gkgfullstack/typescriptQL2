import React from "react";
import { mount, shallow } from 'enzyme';
import { getColumns, sortOrder, defaultColumns, renderAction, renderDate, renderTime, renderValue } from './RetailDiagnosticTable.service';
import { Sorting } from "src/types/Sorting";
import ConfigureClientTableInfo from "src/types/ConfigureClientTableInfo";
import { MemoryRouter } from 'react-router-dom';
import routes from 'src/routes';

it('should be correct results of sortOrder method', () => {
    const sorting: Sorting<ConfigureClientTableInfo> = { field: 'ID', order: 'ascend' };
    let result = sortOrder(sorting, 'name');
    expect(result).toBe(false);
    result = sortOrder(sorting, 'ID');
    expect(result).toBe(sorting.order);
});

it('should be correct results of renderValue method', () => {
    const value = 'value';
    const result = shallow(renderValue(value));
    expect(result.find('span').text()).toBe(value);
});

it('should be correct results of renderTime method when date is not valid', () => {
    let value = undefined;
    let result = renderTime(value);
    expect(result).toBe('');
    value = 0;
    result = renderTime(value);
    expect(result).toBe('0');
});

it('should be correct results of renderTime method when date is less than 24 hours', () => {
    let value: any = '900';
    let result = renderTime(value);
    expect(result).toBe('00:15:00');
    value = '909';
    result = renderTime(value);
    expect(result).toBe('00:15:09');
    value = '9090';
    result = renderTime(value);
    expect(result).toBe('02:31:30');
});

it('should be correct results of renderTime method when date is more than 24 hours', () => {
    let value: any = '900000';
    let result = renderTime(value);
    expect(result).toBe('250:00:00');
    value = '100000';
    result = renderTime(value);
    expect(result).toBe('27:46:40');
});

it('should be correct results of renderDate method', () => {
    const value = '2021-07-18T07:00:33';
    const result = renderDate(value);
    expect(result.split(' ')[0]).toBe('07-18-2021');
});

it('should be correct results of renderAction method', () => {
    const record = {
        searchType: 'SPIDER',
        schemaName: 'schema',
        siteId: 1
    };

    let TestComponent = () => {
        return renderAction(record, jest.fn);
    };
    let wrapper = mount(<MemoryRouter><TestComponent /></MemoryRouter>);
    expect(wrapper.find('a').at(0).props().href).toBe(`${routes.spiderCleanUp}?schema=${record.schemaName}&siteId=${record.siteId}`);

    record.searchType = 'SHALLOW';
    TestComponent = () => {
        return renderAction(record, jest.fn);
    };
    wrapper = mount(<MemoryRouter><TestComponent /></MemoryRouter>);
    expect(wrapper.find('a').at(0).props().href).toBe(`${routes.shallowCleanUp}?schema=${record.schemaName}`);

    record.searchType = 'CRAWL';
    TestComponent = () => {
        return renderAction(record, jest.fn);
    };
    wrapper = mount(<MemoryRouter><TestComponent /></MemoryRouter>);
    expect(wrapper.find('a').at(0).props().href).toBe(`${routes.productCleanUp}?schema=${record.schemaName}&siteId=${record.siteId}`);
});

it('should be correct results of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting, defaultColumns, jest.fn, jest.fn, jest.fn);
    expect(columns[0].title).toBe('Site Name');
    expect(columns[1].title).toBe('Vertical');
    expect(columns[2].title).toBe('Collection Group ID');
    expect(columns[3].title).toBe('Collection Group Name');
    expect(columns[4].title).toBe('Search Type');
    expect(columns[5].title).toBe('Search Status');
    expect(columns[6].title).toBe('Streaming Status');
    expect(columns[7].title).toBe('Complete Timestamp');
});