import React from 'react';
import { mount } from 'enzyme';
import CreateNewClient from "./CreateNewClient";
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const TestComponent = () => {
        return <CreateNewClient industries={[]} schemas={[]} />;
    };
    const wrapper = mount(<MemoryRouter><TestComponent /></MemoryRouter>);
    expect(wrapper.find('CreateNewClient').length).toBe(1);
});