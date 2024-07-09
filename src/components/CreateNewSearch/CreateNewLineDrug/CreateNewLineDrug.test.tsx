import React from 'react';
import { shallow } from 'enzyme';
import CreateNewLineDrug from './CreateNewLineDrug';

describe('CreateNewLineDrug component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateNewLineDrug
            vertical={'vertical'}
            searchName={'searchName'}
            jobId={1}
            appId={'1'}
        />);
    });
});