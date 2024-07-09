import React from 'react';
import { shallow } from 'enzyme';
import CreateNewLineVacation from './CreateNewLineVacation';

describe('CreateNewLineVacation component', () => {
    it('renders without crashing', () => {
        shallow(<CreateNewLineVacation
            jobId={1}
            searchName={'searchName'}
            vertical={'117'}
        />);
    });
});
