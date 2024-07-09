import React from 'react';
import { shallow } from 'enzyme';
import ProductFinder from './ProductFinder';

describe('ProductFinder component ', () => {
  it('render without crashing', () => {
    shallow(<ProductFinder />);
  });
});
