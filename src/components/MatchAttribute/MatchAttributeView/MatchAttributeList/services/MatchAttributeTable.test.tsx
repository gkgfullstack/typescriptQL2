import { shallow } from 'enzyme';
import { nameRender, getColumns} from './MatchAttributeTable.service';
import React from "react";
import routes from 'src/routes';

it('should be correct result of nameRender method', () => {
    const record = {
        ID: 1,
        name: 'name',
        vertical: 'vertical',
    };
    const TestComponent = () => {
        return nameRender(record);
    };
    const wrapper = shallow(<TestComponent />);
    expect(wrapper.find('Link').get(0).props.to).toBe(`${routes.matchCategory}?ID=${record.ID}&name=${record.name}&vertical=${record.vertical}`);
    expect(wrapper.find('Link').get(0).props.children).toBe(record.name);
});

it('should be correct titles of getColumns method', () => {
    const sorting = { field: 'ID', order: 'descend' };
    const columns = getColumns(sorting, jest.fn);
    expect(columns[0].title).toBe('Match Category ID');
    expect(columns[1].title).toBe('Match Category Name');
    expect(columns[2].title).toBe('Vertical');
    expect(columns[3].title).toBe('Actions');
});

it('should be correct keys of getColumns method', () => {
    const sorting = { field: 'name', order: 'ascend' };
    const columns = getColumns(sorting, jest.fn);
    expect(columns.length > 0).toBe(true);
    expect(columns[0].key).toBe('ID');
    expect(columns[1].key).toBe('name');
    expect(columns[2].key).toBe('vertical');
});