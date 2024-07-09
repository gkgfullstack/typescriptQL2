import React from 'react';
import { shallow } from 'enzyme';
import CompareMatchesView, { CompareMatchesViewProps, SHIFT_MATCH_COUNT } from './CompareMatchesView';
import ProductInfo from 'src/types/ProductInfo';
import ProductMatchInfo from 'src/types/ProductMatcheInfo';

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
  status: 0,
  lowestPrice: '',
  categoryNameGet: '',
  priceInfo: '',
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
    sourceOwnerId: '',
    priceCollectedTimestamp: '',
    benchmarkMatch: '',
    matchTypeFilter: '',
    region: '',
    priceType: '',
    lowerVariance: '',
    lowestPriceVariance: '',
    lowestPriceInfo: '',
  },
  {
    matchType: 'LIKE',
    variance: '-1',
    varianceMetric: '%',
    productId: '9',
    canonicalId: '11',
    removeRequest: false,
    ...productInfo,
    sourceOwnerId: '',
    priceCollectedTimestamp: '',
    benchmarkMatch: '',
    matchTypeFilter: '',
    region: '',
    priceType: '',
    lowerVariance: '',
    lowestPriceVariance: '',
    lowestPriceInfo: '',
  },
];

const getProps = (
  product: ProductInfo = productInfo,
  matches: ProductMatchInfo[] = productMatches
): CompareMatchesViewProps => {
  return {
    loading: false,
    totalMatches: 10,
    product: product,
    productMatches: matches,
    getMoreMatches: jest.fn,
  };
};

describe('CompareMatchesView component ', () => {
  it('renders without crashing', () => {
    const props = getProps();
    delete props.product;
    shallow(<CompareMatchesView {...props} />);
  });

  it('renders Widget and Table components', () => {
    const props = getProps();
    const wrapper = shallow(<CompareMatchesView {...props} />);
    expect(wrapper.find('Widget')).toHaveLength(1);
    expect(wrapper.find('CompareMatchesTable')).toHaveLength(1);
  });
  it('renders title message for Widget that equals "Compare Matches ({totalMatches})"', () => {
    const props = getProps();
    const wrapper = shallow(<CompareMatchesView {...props} />);
    expect(wrapper.find('Widget').prop('title')).toEqual(`Compare Matches (${props.totalMatches})`);

    wrapper.setProps({ totalMatches: 30 });
    expect(wrapper.find('Widget').prop('title')).toEqual(`Compare Matches (30)`);
  });
  it('renders CarouselButtonsBar component for Widget actions component with appropriate props', () => {
    const props = getProps();
    const wrapper = shallow(<CompareMatchesView {...props} />);
    const actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    const buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar).toHaveLength(1);
    expect(buttonsBar.prop('totalMatches')).toEqual(props.totalMatches);
    expect(buttonsBar.prop('product')).toEqual(props.product);
    expect(buttonsBar.prop('productMatches')).toEqual(props.productMatches);
    expect(buttonsBar.prop('loading')).toEqual(props.loading);
    expect(buttonsBar.prop('currentIndex')).toEqual(0);
    expect(buttonsBar.prop('itemsPerPage')).toEqual(SHIFT_MATCH_COUNT);
    expect(buttonsBar.prop('onClick')).toBeInstanceOf(Function);
  });
  it('renders component with new currentIndex value when CarouselButtonsBar component fires onClick', () => {
    const props = getProps();
    const wrapper = shallow(<CompareMatchesView {...props} />);
    let actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    let buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar).toHaveLength(1);
    expect(buttonsBar.prop('currentIndex')).toEqual(0);

    buttonsBar.simulate('click', 1);
    actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar.prop('currentIndex')).toEqual(1);

    buttonsBar.simulate('click', -1);
    actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar.prop('currentIndex')).toEqual(0);
  });
  it('renders component with new currentIndex value that can not be negative when CarouselButtonsBar component fires onClick', () => {
    const props = getProps();
    const wrapper = shallow(<CompareMatchesView {...props} />);
    let actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    let buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar).toHaveLength(1);
    expect(buttonsBar.prop('currentIndex')).toEqual(0);

    buttonsBar.simulate('click', -2);
    actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar.prop('currentIndex')).toEqual(0);

    buttonsBar.simulate('click', 1);
    actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar.prop('currentIndex')).toEqual(1);

    buttonsBar.simulate('click', -2);
    actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar.prop('currentIndex')).toEqual(0);
  });
  it('renders component with new currentIndex value that can not be more than totalMatches minus items per page value when CarouselButtonsBar component fires onClick', () => {
    const props = getProps();
    const wrapper = shallow(<CompareMatchesView {...props} />);
    let actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    let buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar).toHaveLength(1);
    expect(buttonsBar.prop('currentIndex')).toEqual(0);

    buttonsBar.simulate('click', props.totalMatches - SHIFT_MATCH_COUNT);
    actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar.prop('currentIndex')).toEqual(props.totalMatches - SHIFT_MATCH_COUNT);

    buttonsBar.simulate('click', SHIFT_MATCH_COUNT);
    actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    buttonsBar = actions.find('CarouselButtonsBar');
    expect(buttonsBar.prop('currentIndex')).toEqual(props.totalMatches - SHIFT_MATCH_COUNT);
  });
  it('calls getMoreItems when CarouselButtonsBar component fires onClick and number of loaded items less than total value', () => {
    const props = getProps();
    const onGetMoreMatchesSpy = jest.spyOn(props, 'getMoreMatches');
    const wrapper = shallow(<CompareMatchesView {...props} />);
    const actions = shallow(<div>{wrapper.find('Widget').prop('actions')}</div>);
    const buttonsBar = actions.find('CarouselButtonsBar');

    buttonsBar.simulate('click', 2);
    expect(onGetMoreMatchesSpy).toHaveBeenCalledTimes(1);

    buttonsBar.simulate('click', -2);
    expect(onGetMoreMatchesSpy).toHaveBeenCalledTimes(1);

    wrapper.setProps({ totalMatches: productMatches.length });
    buttonsBar.simulate('click', -2);
    expect(onGetMoreMatchesSpy).toHaveBeenCalledTimes(1);
  });
});
