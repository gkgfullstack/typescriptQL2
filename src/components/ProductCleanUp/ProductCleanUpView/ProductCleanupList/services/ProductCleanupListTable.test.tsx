import { mount } from 'enzyme';
import { productNameRender, getColumns, defaultColumns } from './ProductCleanupListTable.service';
import React from "react";

it('should be correct result of productNameRender method', () => {
    const record = {
        productUrl: '',
        productName: 'name of original product'
    };
    const TestComponent = () => {
        return productNameRender(record);
    };
    const wrapper = mount(<TestComponent />);
    expect(wrapper.find('a').get(0).props.href).toBe(record.productUrl);
    expect(wrapper.find('a').get(0).props.children).toBe(record.productName);
});

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting, defaultColumns, jest.fn);
    expect(columns[0].title).toBe('Product Name');
    expect(columns[1].title).toBe('Product ID');
    expect(columns[2].title).toBe('M1');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting, defaultColumns, jest.fn);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('productName');
    expect(columns[1].key).toBe('productId');
    expect(columns[2].key).toBe('m1');
});