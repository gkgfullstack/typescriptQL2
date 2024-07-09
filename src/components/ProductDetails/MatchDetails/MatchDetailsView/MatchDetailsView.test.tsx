import React from 'react';
import { shallow } from 'enzyme';
import MatchDetailsView, { MatchDetailsViewProps } from './MatchDetailsView';
import ProductInfo from 'src/types/ProductInfo';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';
import { Sorting } from 'src/types/Sorting';

const productInfo: ProductInfo = {
  ID: '674627364',
  name: 'test product',
  currency: 'USD',
  price: 1.99,
  description: 'some description',
  ownerID: '1',
  ownerImage: 'http://amazon.com/logo.png',
  ownerName: 'Amazon',
  imageURL: 'http://ql2.com/productImage.png',
  productURL: 'http://amazon.com/product',
  uniqueIdentifierName1: 'SKU',
  uniqueIdentifierValue1: '0JSDHJS73',
  uniqueIdentifierName2: 'Manufacturer',
  uniqueIdentifierValue2: 'Lokar',
  category: 'Test&test2',
  metaData: [
    {
      id: 1,
      name: 'Manufacturer',
      value: 'LOKAR',
    },
    {
      id: 2,
      name: 'Model Number',
      value: 'LOK-TCB-40LTC',
    },
    {
      id: 3,
      name: 'SKU',
      value: '0JSDHJS73',
    },
    {
      id: 4,
      name: 'UPC',
      value: '835573009484',
    },
    {
      id: 5,
      name: 'Color',
      value: '',
    },
  ],
};

const productMatches: ProductMatchInfo[] = [
  {
    matchType: 'EXACT',
    variance: '-10',
    varianceMetric: '%',
    productId: '8',
    canonicalId: '10',
    removeRequest: false,
    ...productInfo,
  },
  {
    matchType: 'LIKE',
    variance: '-1',
    varianceMetric: '%',
    productId: '9',
    canonicalId: '11',
    removeRequest: true,
    ...productInfo,
  },
];

const sorting: Sorting<ProductMatchInfo> = {
  field: 'matchType',
  order: 'ascend',
};

const getProps = (): MatchDetailsViewProps => {
  return {
    loading: false,
    items: productMatches,
    itemsPerPage: 2,
    totalItems: 2,
    sorting: sorting,
    onSortingChange: jest.fn(),
    getMoreItems: jest.fn(),
  };
};

describe('MatchDetailsView component ', () => {
  it('renders without crashing', () => {
    shallow(<MatchDetailsView {...getProps()} />);
  });
  it('renders header with total matches information', () => {
    const wrapper = shallow(<MatchDetailsView {...getProps()} />);
    const header = wrapper.find('h2');
    expect(header).toHaveLength(1);
    expect(header.children().text()).toEqual('Matches (2)');
  });
  it('renders MatchDetailsTable component with the same props', () => {
    const props = getProps();
    const wrapper = shallow(<MatchDetailsView {...props} />);
    const component = wrapper.find('MatchDetailsTable');
    expect(component).toHaveLength(1);
    expect(component.prop('items')).toEqual(props.items);
    expect(component.prop('loading')).toEqual(props.loading);
    expect(component.prop('totalItems')).toEqual(props.totalItems);
    expect(component.prop('itemsPerPage')).toEqual(props.itemsPerPage);
    expect(component.prop('sorting')).toEqual(props.sorting);
    expect(component.prop('onSortingChange')).toEqual(props.onSortingChange);
    expect(component.prop('getMoreItems')).toEqual(props.getMoreItems);
  });
});
