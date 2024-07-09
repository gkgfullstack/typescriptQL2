import React from 'react';
import { shallow } from 'enzyme';
import MatchCategorySearch from './MatchCategorySearch';

it('renders without crashing', () => {
    shallow(<MatchCategorySearch
        placeholder={'placeholder'}
        defaultValue={''}
        value={''}
        loading={false}
        search={''}
        onChangeSearch={jest.fn}
    />);
});