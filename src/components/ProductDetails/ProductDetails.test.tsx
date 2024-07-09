import React from 'react';
import { shallow } from 'enzyme';
import ProductDetails from './ProductDetails';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: (): { id: string, isSourceProduct:string, sourceOwnerId:string } => ({
    id: '1',
    isSourceProduct:'1',
    sourceOwnerId:'1',

  }),
}));

it('renders without crashing', () => {
  shallow(<ProductDetails />);
});
