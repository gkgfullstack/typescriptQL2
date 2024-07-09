import React from 'react';
import { shallow } from 'enzyme';
import MatchedProductsFilter from './MatchedProductsFilter';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';

jest.mock('src/hooks/useQueryUrlParamsDispatch');

let props = {
  onChange: jest.fn(),
};

const useQueryUrlParamsDispatchMock = useQueryUrlParamsDispatch as jest.Mock;

describe('MatchedProductsFilter component ', () => {
  let setQuery = jest.fn();
  beforeEach(() => {
    useQueryUrlParamsDispatchMock.mockReturnValue(setQuery);
  });
  it('renders without crashing', () => {
    shallow(<MatchedProductsFilter {...props} />);
  });
  it('renders Accordion component with default header value', () => {
    const wrapper = shallow(<MatchedProductsFilter {...props} />);
    const view = wrapper.find('Accordion');
    expect(view).toHaveLength(1);
    expect(view.prop('header')).toEqual('Number of Matched Products');
  });
  it('renders Accordion panel with Checkbox.Group and header that is equal to header prop', () => {
    const wrapper = shallow(<MatchedProductsFilter {...props} header="MATCHED PRODUCTS" />);
    const accordion = wrapper.find('Accordion');
    expect(accordion.prop('header')).toEqual('MATCHED PRODUCTS');
    const view = accordion.find('CheckboxGroup');
    expect(view).toHaveLength(1);
  });
  it('renders Checkbox.Group component with default props', () => {
    const wrapper = shallow(<MatchedProductsFilter {...props} />);
    const accordion = wrapper.find('Accordion');
    const view = accordion.find('CheckboxGroup');
    expect(view.prop('value')).toEqual([]);
    expect(view.prop('defaultValue')).toEqual([]);
    expect(view.prop('onChange')).toBeDefined();
  });
  it('renders Checkbox Group component with defaultValue prop that is set to component defaultValue prop when defaultValue is defined', () => {
    const wrapper = shallow(<MatchedProductsFilter {...props} defaultValue={['1', '2']} />);
    const accordion = wrapper.find('Accordion');
    const view = accordion.find('CheckboxGroup');
    expect(view.prop('value')).toEqual(['1', '2']);
    expect(view.prop('defaultValue')).toEqual(['1', '2']);
  });
  it('calls component method onSelect with changed value when Checkbox.Group component method onChange fires', () => {
    const onChangeSpy = jest.spyOn(props, 'onChange');
    const wrapper = shallow(<MatchedProductsFilter {...props} />);
    const accordion = wrapper.find('Accordion');
    const view = accordion.find('CheckboxGroup');
    expect(view.prop('value')).toEqual([]);
    const onChange: Function = view.prop('onChange') as Function;
    onChange(['test-value']);
    expect(onChangeSpy).toHaveBeenCalled();
    expect(onChangeSpy).toBeCalledWith('matches', ['test-value']);
  });
});
