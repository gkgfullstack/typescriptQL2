import React from 'react';
import { shallow } from 'enzyme';
import MatchCategoryList from "./MatchCategoryList";

it('renders without crashing', () => {
    shallow(<MatchCategoryList search={''} categoryId={''} requestParams={{}} setRequestParams={jest.fn} />);
});