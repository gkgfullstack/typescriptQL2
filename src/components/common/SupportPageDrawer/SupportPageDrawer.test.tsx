import React from 'react';
import { shallow } from 'enzyme';
import SupportPageDrawer from './SupportPageDrawer';

it('renders without crashing', () => {
    shallow(<SupportPageDrawer
        visible={false}
        setVisible={jest.fn}
    />);
});