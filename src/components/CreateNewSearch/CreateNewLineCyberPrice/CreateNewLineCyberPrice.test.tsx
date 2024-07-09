import React from 'react';
import { shallow } from 'enzyme';
import CreateNewLineCyberPrice from './CreateNewLineCyberPrice';

describe('CreateNewLineCyberPrice component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateNewLineCyberPrice
            vertical={'120'}
            searchName={'searchName'}
            jobId={1}
        />);
    });
});