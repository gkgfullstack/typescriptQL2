import React from 'react';
import { shallow } from 'enzyme';
import CreateNewLineSolution from './CreateNewLineSolution';

describe('CreateNewLineSolution component', () => {
    it('renders without crashing', () => {
        shallow(<CreateNewLineSolution
            jobId={1}
            searchName={'searchName'}
        />);
    });
});