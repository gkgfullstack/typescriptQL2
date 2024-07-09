import React from 'react';
import { shallow } from 'enzyme';
import FilterPanel from "./FilterPanel";

it('renders without crashing', () => {
    shallow(<FilterPanel setParams={jest.fn} isIndustryUpdated={false} updateIndustry={jest.fn} />);
});