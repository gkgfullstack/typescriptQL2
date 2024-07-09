import React from 'react';
import { shallow } from 'enzyme';
import CreateFerryDates from './CreateFerryDates';

describe('CreateFerryDates component ', () => {
  it('renders without crashing', () => {
    shallow(<CreateFerryDates firstDate={''} lastDate={''} onUpdate={jest.fn}/>);
  });
});
