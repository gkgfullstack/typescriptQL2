import ProductInfo from 'src/types/ProductInfo';
import {
  defaultState,
  PRODUCT_DETAILS_ACTION_TYPES,
  ProductDetailsState,
  ProductDetailsStateProvider,
  reducer,
} from './productDetailsStateProvider';
import ProductMatchInfo from '../types/ProductMatcheInfo';
import { shallow } from 'enzyme';
import * as React from 'react';

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
  categoryNameGet:'Test&test2',
  status:2,
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
    benchmarkMatch:'1',
    ...productInfo,
  },
  {
    matchType: 'LIKE',
    variance: '-1',
    varianceMetric: '%',
    productId: '9',
    canonicalId: '11',
    removeRequest: false,
    benchmarkMatch:'1',
    ...productInfo,
  },
];

const state: ProductDetailsState = {
  removedMatches: [],
  product: undefined,
  productId: '',
  benchmarkedMatches:[],
  unBenchmarkedMatches:[],
};

describe('productDetailsStateProvider provider ', () => {
  it('updates state productId to new productId value and reset product value when setProductId action fires', () => {
    const productDetailsState: ProductDetailsState = reducer(
      { ...state, product: productInfo },
      {
        type: PRODUCT_DETAILS_ACTION_TYPES.setProductId,
        payload: { productId: '1' } as ProductDetailsState,
      }
    );
    expect(productDetailsState.productId).toEqual('1');
    expect(productDetailsState.product).toEqual(undefined);
  });
  it('updates state product prop to new product value when setProduct action fires and new size is defined', () => {
    const productDetailsState: ProductDetailsState = reducer(state, {
      type: PRODUCT_DETAILS_ACTION_TYPES.setProduct,
      payload: { product: productInfo } as ProductDetailsState,
    });
    expect(productDetailsState.product).toEqual(productInfo);
  });
  it('updates state removedMatches prop and adds to existing values new removedMatches values when removeMatches action fires and new removedMatches is defined', () => {
    let productDetailsState: ProductDetailsState = reducer(state, {
      type: PRODUCT_DETAILS_ACTION_TYPES.removeMatches,
      payload: { removedMatches: productMatches } as ProductDetailsState,
    });
    expect(productDetailsState.removedMatches.length).toEqual(2);

    productDetailsState = reducer(
      { ...state, removedMatches: productMatches },
      {
        type: PRODUCT_DETAILS_ACTION_TYPES.removeMatches,
        payload: { removedMatches: productMatches } as ProductDetailsState,
      }
    );
    expect(productDetailsState.removedMatches.length).toEqual(2);
  });

  it('updates state unBenchmarkedMatches prop and adds to existing values new unBenchmarkedMatches values when removeMatches action fires and new unBenchmarkedMatches is defined', () => {
    let productDetailsState: ProductDetailsState = reducer(state, {
      type: PRODUCT_DETAILS_ACTION_TYPES.unBenchmarkMatches,
      payload: { unBenchmarkedMatches: productMatches } as ProductDetailsState,
    });
    expect(productDetailsState.unBenchmarkedMatches.length).toEqual(2);

    productDetailsState = reducer(
      { ...state, unBenchmarkedMatches: productMatches },
      {
        type: PRODUCT_DETAILS_ACTION_TYPES.unBenchmarkMatches,
        payload: { unBenchmarkedMatches: productMatches } as ProductDetailsState,
      }
    );
    expect(productDetailsState.unBenchmarkedMatches.length).toEqual(2);
  });

  it('updates state benchmarkedMatches prop and adds to existing values new benchmarkedMatches values when benchmarkMatches action fires and new benchmarkedMatches is defined', () => {
    let productDetailsState: ProductDetailsState = reducer(state, {
      type: PRODUCT_DETAILS_ACTION_TYPES.benchmarkMatches,
      payload: { benchmarkedMatches: productMatches } as ProductDetailsState,
    });
    expect(productDetailsState.benchmarkedMatches.length).toEqual(2);

    productDetailsState = reducer(
      { ...state, benchmarkedMatches: productMatches },
      {
        type: PRODUCT_DETAILS_ACTION_TYPES.benchmarkMatches,
        payload: { benchmarkedMatches: productMatches } as ProductDetailsState,
      }
    );
    expect(productDetailsState.benchmarkedMatches.length).toEqual(2);
  });

  it('renders ProductDetailsStateProvider component without crashing', () => {
    const wrapper = shallow(<ProductDetailsStateProvider>Child</ProductDetailsStateProvider>);
    expect(wrapper.find('ContextProvider')).toHaveLength(2);
    expect(
      wrapper
        .find('ContextProvider')
        .at(1)
        .prop('value')
    ).toEqual(defaultState);
    const dispatch = wrapper
      .find('ContextProvider')
      .at(0)
      .prop('value');
    expect(dispatch).toBeDefined();
  });
});
