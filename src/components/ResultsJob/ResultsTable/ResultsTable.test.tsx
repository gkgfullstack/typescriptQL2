import React from 'react';
import { shallow } from 'enzyme';
import ResultsTable from './ResultsTable';

it('renders without crashing', () => {
  shallow(<ResultsTable />);
});
