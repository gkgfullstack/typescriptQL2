import React from 'react';
import { shallow } from 'enzyme';
import CreateNewLineCruise from './CreateNewLineCruise';

describe('CreateNewLineCruise component ', () => {
  it('renders without crashing', () => {
    shallow(<CreateNewLineCruise searchName={'searchName'} jobId={1} />);
  });
});
