import React from 'react';
import { shallow } from 'enzyme';
import CarouselButtonsBar, { CarouselButtonsBarProps } from './CarouselButtonsBar';
import ProductInfo from 'src/types/ProductInfo';

const getProps = (): CarouselButtonsBarProps => {
  return {
    loading: false,
    currentIndex: 0,
    itemsPerPage: 2,
    totalMatches: 10,
    onClick: jest.fn(),
    product: {} as ProductInfo,
    productMatches: [],
    getMoreMatches: jest.fn,
  };
};

describe('CarouselButtonsBar component ', () => {
  it('renders without crashing', () => {
    shallow(<CarouselButtonsBar {...getProps()} />);
  });

  it('renders buttons Prev and Next', () => {
    const wrapper = shallow(<CarouselButtonsBar {...getProps()} />);
    expect(wrapper.find('Button')).toHaveLength(2);
  });

  it('renders buttons Prev as disabled when currentIndex property is equal zero or data is loading', () => {
    const props = getProps();
    const wrapper = shallow(<CarouselButtonsBar {...props} />);
    expect(
      wrapper
        .find('Button')
        .first()
        .prop('disabled')
    ).toEqual(true);

    wrapper.setProps({ currentIndex: 2 });
    expect(
      wrapper
        .find('Button')
        .first()
        .prop('disabled')
    ).toEqual(false);

    wrapper.setProps({ loading: true });
    expect(
      wrapper
        .find('Button')
        .first()
        .prop('disabled')
    ).toEqual(true);
  });
  it('renders buttons Next as disabled when the last portion of items is loaded or total count of items less than count items per page or data is loading', () => {
    const props = getProps();
    const wrapper = shallow(<CarouselButtonsBar {...props} />);
    expect(
      wrapper
        .find('Button')
        .last()
        .prop('disabled')
    ).toEqual(false);

    wrapper.setProps({ loading: true });
    expect(
      wrapper
        .find('Button')
        .last()
        .prop('disabled')
    ).toEqual(true);

    wrapper.setProps({ currentIndex: props.totalMatches - props.itemsPerPage, loading: false });
    expect(
      wrapper
        .find('Button')
        .last()
        .prop('disabled')
    ).toEqual(true);

    wrapper.setProps({ totalMatches: 2, itemsPerPage: 3 });
    expect(
      wrapper
        .find('Button')
        .last()
        .prop('disabled')
    ).toEqual(true);
  });
  it('calls onClick with count of items that should be shifted as negative value when user clicks on Prev button', () => {
    const props = getProps();
    const onClickSpy = jest.spyOn(props, 'onClick');
    const wrapper = shallow(<CarouselButtonsBar {...props} />);
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    expect(onClickSpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy).toHaveBeenCalledWith(-props.itemsPerPage);
  });
  it('calls onClick with count of items that should be shifted as positive value when user clicks on Next button', () => {
    const props = getProps();
    const onClickSpy = jest.spyOn(props, 'onClick');
    const wrapper = shallow(<CarouselButtonsBar {...props} />);
    wrapper
      .find('Button')
      .last()
      .simulate('click');
    expect(onClickSpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy).toHaveBeenCalledWith(props.itemsPerPage);
  });
});
