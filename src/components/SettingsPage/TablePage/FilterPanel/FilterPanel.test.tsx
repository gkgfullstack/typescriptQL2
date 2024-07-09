import React from 'react';
import { shallow } from 'enzyme';
import FilterPanel from "./FilterPanel";

it('renders without crashing', () => {
    shallow(<FilterPanel setParamsValues={undefined} enablePTC={false} onUpdateCreateNew={undefined}  />);
});