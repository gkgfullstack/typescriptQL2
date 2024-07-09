import React from "react";
import { mount, shallow } from 'enzyme';
import { clientNameRender, getColumns, sortOrder, statusRender } from './ConfigureClientListTable.service';
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

it('should be correct results of statusRender method', () => {
    let result = shallow(statusRender({ active: true }, jest.fn));
    expect(result.props().children.props.className).toBe('status_active_icon');
    result = shallow(statusRender({ active: false }, jest.fn));
    expect(result.props().children.props.className).toBe('status_inactive_icon');
});

it('should be correct results of clientNameRender method', () => {
    const TestComponent = () => {
        return clientNameRender({ ID: "1", name: "name", active: true, mwsSchema: "schema" });
    };
    const wrapper = mount(<MemoryRouter><TestComponent /></MemoryRouter>);
    expect(wrapper.find('a').props().href).toBe(`${routes.configureClient}?clientId=1&name=name&status=true&schema=schema`);
    expect(wrapper.find('a').text()).toBe('name');
});

it('should be correct results of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting, jest.fn);
    expect(columns[0].title).toBe('Client ID');
    expect(columns[1].title).toBe('Client Name');
    expect(columns[2].title).toBe('Industry');
    expect(columns[3].title).toBe('Vertical');
    expect(columns[4].title).toBe('Client Status');
});