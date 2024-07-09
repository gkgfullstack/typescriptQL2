import React from 'react';
import { shallow } from 'enzyme';
import SKUView from './SKUView';

it('renders without crashing', () => {
    shallow(<SKUView />);
});
