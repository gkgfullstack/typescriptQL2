import React from 'react';
import { shallow } from 'enzyme';
import UsageFilter from "./UsageFilter";

it('renders without crashing', () => {
    shallow(<UsageFilter
        name={'name'}
        options={[]}
        onUpdate={jest.fn}
        isReset={false}
    />);
});