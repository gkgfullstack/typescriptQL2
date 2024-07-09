import React from 'react';
import { shallow } from 'enzyme';
import SKUSearch from './SKUSearch';

it('renders without crashing', () => {
    shallow(<SKUSearch
        placeholder={''}
        defaultValue={''}
        value={''}
        loading={false}
        search={''}
        onChangeSearch={jest.fn}
    />);
});
