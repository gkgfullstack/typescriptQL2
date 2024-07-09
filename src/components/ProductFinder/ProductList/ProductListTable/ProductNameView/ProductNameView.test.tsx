import React from 'react';
import { shallow } from 'enzyme';
import ProductFinderInfo from 'src/types/ProductFinderInfo';
import ProductNameView from './ProductNameView';

const productInfo: ProductFinderInfo = {
  ID: '674627364',
  key: '674627364-1',
  name: 'test product',
  currency: 'USD',
  price: 1.99,
  description: 'some description',
  ownerID: '1',
  ownerImage: 'http://amazon.com/amazon.png',
  ownerName: 'Amazon',
  imageURL: 'http://ql2.com/productImage.png',
  productURL: 'http://amazon.com/product',
  uniqueIdentifierName1: 'SKU',
  uniqueIdentifierValue1: '0JSDHJS73',
  uniqueIdentifierName2: 'Manufacturer',
  uniqueIdentifierValue2: 'Lokar',
  category: 'Air & Fuel Delivery:Carburetors & Accessories',
  status:0, 
  categoryNameGet:"", 
  priceInfo:"",
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

describe('ProductNameView component ', () => {
  it(' without crashing', () => {
    shallow(<ProductNameView {...productInfo} />);
  });
  it('renders Image component with image url prop from productInfo object', () => {
    const wrapper = shallow(<ProductNameView {...productInfo} />);
    const image = wrapper.find('.product_picture Image');
    expect(image).toHaveLength(1);
    expect(image.prop('url')).toEqual(productInfo.imageURL);
    expect(image.prop('alt')).toEqual(productInfo.name);
  });
  it('checks correct parsing breadcrumbs values', () => {
    const wrapper = shallow(<ProductNameView {...productInfo} />);
    const breadcrumbs = wrapper.find('BreadcrumbItem');
    const breadcrumb1 = breadcrumbs.get(0).props.children;
    const breadcrumb2 = breadcrumbs.get(1).props.children;
    expect(breadcrumb1).toEqual('Air & Fuel Delivery');
    expect(breadcrumb2).toEqual('Carburetors & Accessories');
  });
  it('checks correct render product keys params from productInfo object', () => {
    const wrapper = shallow(<ProductNameView {...productInfo} />);
    const keys = wrapper.find('.product_keys');
    expect(keys.text()).toEqual('SKU: 0JSDHJS73 | Manufacturer: Lokar');
  });
});
