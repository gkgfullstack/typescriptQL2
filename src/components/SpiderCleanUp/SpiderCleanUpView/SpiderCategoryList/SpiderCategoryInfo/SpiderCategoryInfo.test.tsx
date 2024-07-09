import React from 'react';
import { shallow } from 'enzyme';
import SpiderCategoryInfo from "./SpiderCategoryInfo";

it('renders without crashing', () => {
    shallow(<SpiderCategoryInfo
        totalCategoriesCount={100}
        newCategoriesCount={23}
        deletedCategoriesCount={77}
    />);
});