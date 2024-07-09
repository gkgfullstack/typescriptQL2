import React from 'react';
import { mount } from 'enzyme';
import OpsCenterView from "./OpsCenterView";
import { MemoryRouter } from 'react-router-dom';

it('should be 5 default tabs', () => {
    const wrapper = mount(<MemoryRouter><OpsCenterView /></MemoryRouter>);
    expect(wrapper.find('TabPane').length).toBe(5);
});
