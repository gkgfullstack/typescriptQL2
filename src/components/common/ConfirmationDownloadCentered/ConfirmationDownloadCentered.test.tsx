import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationDownloadCentered from './ConfirmationDownloadCentered';

it('renders without crashing', () => {
    shallow(<ConfirmationDownloadCentered
        title={'title'}
        visible={true}
        setVisible={jest.fn}
        onAction={jest.fn}
        okText={'ok'}
        cancelText={'cancel'}
    />);
});