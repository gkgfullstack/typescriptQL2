import React from 'react';
import { shallow } from 'enzyme';
import CreateNewLineAutopart from './CreateNewLineAutopart';

describe('CreateNewLineAutopart component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateNewLineAutopart
            appId={'appId'}
            vertical={'vertical'}
            searchName={'searchName'}
            jobId={1}
        />);
    });
});