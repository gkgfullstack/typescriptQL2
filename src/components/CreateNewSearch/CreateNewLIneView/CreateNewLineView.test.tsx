import React from 'react';
import { shallow } from 'enzyme';
import CreateNewLineView from "./CreateNewLineView";

describe('CreateNewLineView component ', () => {
    it('renders without crashing', () => {
        shallow(<CreateNewLineView
            vertical={'vertical'}
            searchName={'searchName'}
            jobId={'jobId'}
            addLineItem={jest.fn()}
        />);
    });
});