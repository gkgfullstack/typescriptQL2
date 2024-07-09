import React from 'react';
import { shallow } from 'enzyme';
import SpiderCategoryList from "./SpiderCategoryList";

it('renders without crashing', () => {
    shallow(<SpiderCategoryList
        category={"category"}
        site={" site name"}
        schema={"schema"}
    />);
});