import React from 'react';
import { shallow } from 'enzyme';
import ColumnChart from './ErrorChart';
import { PriceDistributionChart } from 'src/components/QMDashboard/PriceDistributionGraph/PriceDistributionGraph';

jest.mock('@antv/g2');

const EXAMPLE_DATA: PriceDistributionChart[] = [
  { id: '1', key: 'BELOW&>25%', type: 'BELOW', sortOrder: -3, label: '>25%', value: 0 },
  { id: '2', key: 'BELOW&10-25%', type: 'BELOW', sortOrder: -2, label: '10-25%', value: 25 },
  { id: '3', key: 'BELOW&2-10%', type: 'BELOW', sortOrder: -1, label: '2-10%', value: 20 },
  { id: '4', key: 'SIMILAR&+/- 2%', type: 'SIMILAR', sortOrder: 0, label: '+/- 2%', value: 30 },
  { id: '5', key: 'ABOVE&2-10%', type: 'ABOVE', sortOrder: 1, label: '2-10%', value: 43 },
  { id: '6', key: 'ABOVE&10-25%', type: 'ABOVE', sortOrder: 2, label: '10-25%', value: 20 },
  { id: '7', key: 'ABOVE&25%<', type: 'ABOVE', sortOrder: 3, label: '25%<', value: 25 },
];

const defaultProps = {
  data: EXAMPLE_DATA,
  onChange: jest.fn(),
  id: '',
};

describe('ColumnChart component ', () => {
  it('renders without crashing', () => {
    shallow(<ColumnChart {...defaultProps} />);
  });
  it('renders when component id prop is defined', () => {
    const wrapper = shallow(<ColumnChart {...defaultProps} id="_id_01" />);
    let panel = wrapper.find('#_id_01');
    expect(panel).toHaveLength(1);
  });
});
