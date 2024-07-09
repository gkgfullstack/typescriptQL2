import React from 'react';
import { shallow } from 'enzyme';
import FilesListTable from './FilesListTable';

it('renders without crashing', () => {
  shallow(<FilesListTable />);
});
