import React from 'react';
import { shallow } from 'enzyme';
import MatchAttributeSearch from './MatchAttributeSearch';

it('renders without crashing', () => {
    shallow(<MatchAttributeSearch
        placeholder={''}
        defaultValue={''}
        value={''}
        loading={false}
        onChangeSearch={jest.fn}
    />);
});