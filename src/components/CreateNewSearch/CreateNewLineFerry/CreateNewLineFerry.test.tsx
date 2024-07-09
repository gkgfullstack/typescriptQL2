import React from 'react';
import { shallow } from 'enzyme';
import CreateNewLineFerry from './CreateNewLineFerry';

describe('CreateNewLineFerry component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateNewLineFerry
            addLineItem={jest.fn}
            searchName={'searchName'}
            jobId={1}
        />);
    });
});