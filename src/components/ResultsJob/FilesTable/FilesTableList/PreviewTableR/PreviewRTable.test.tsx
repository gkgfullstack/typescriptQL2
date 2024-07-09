import React from 'react';
import { shallow } from 'enzyme';
import PreviewRTable from './PreviewRTable';

it('renders without crashing', () => {
  shallow(<PreviewRTable resultid />);
});
