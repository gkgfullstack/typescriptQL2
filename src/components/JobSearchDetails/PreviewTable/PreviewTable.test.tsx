import React from 'react';
import { shallow } from 'enzyme';
import PreviewTable from './PreviewTable';

it('renders without crashing', () => {
  shallow(<PreviewTable />);
});
