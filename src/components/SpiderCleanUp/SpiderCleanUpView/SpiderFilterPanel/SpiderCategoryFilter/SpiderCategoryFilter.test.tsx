import React from 'react';
import { shallow } from 'enzyme';
import SpiderCategoryFilter from "./SpiderCategoryFilter";

it('renders without crashing', () => {
    shallow(<SpiderCategoryFilter setParams={jest.fn} />);
});