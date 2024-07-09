import React from 'react';
import { mount } from 'enzyme';
import CreateNewTable from "./CreateNewTable";
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const TestComponent = () => {
        return <CreateNewTable  appIds={undefined} onUpdateCreateNew={undefined}  />;
    };
    const wrapper = mount(<MemoryRouter><TestComponent /></MemoryRouter>);
    expect(wrapper.find('CreateNewTable').length).toBe(1);
});