import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationCentered from './ConfirmationCentered';

it('renders without crashing', () => {
    shallow(<ConfirmationCentered
        title={'title'}
        visible={true}
        setVisible={jest.fn}
        onAction={jest.fn}
        okText={'ok'}
        cancelText={'cancel'}
    />);
});