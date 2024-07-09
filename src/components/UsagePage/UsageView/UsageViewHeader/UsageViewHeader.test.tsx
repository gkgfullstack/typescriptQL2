import React from 'react';
import { shallow } from 'enzyme';
import UsageViewHeader from "./UsageViewHeader";

it('renders without crashing', () => {
    shallow(<UsageViewHeader onUpdateFilter={jest.fn} onUpdateUsage={jest.fn} isInputVisible={true} isOutputVisible={false} isSKUVisible={true} user={null}/>);
});