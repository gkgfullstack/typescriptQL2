import React from 'react';
import { shallow } from 'enzyme';
import Image from './Image';

describe('Image component ', () => {
  it('renders without crashing', () => {
    shallow(<Image url={''} alt={''} />);
  });
  it('renders component with className property that should be added into Image container', () => {
    const wrapper = shallow(<Image className={'my_container'} url={''} alt={''} />);
    expect(wrapper.find('.image_container').prop('className')).toContain('my_container');
  });
  it('renders image with src and alt that is equal component props when url is not empty', () => {
    const wrapper = shallow(<Image url={'http://someimage.png'} alt={'some image'} />);
    const img = wrapper.find('.image_container img');
    expect(img).toHaveLength(1);
    expect(img.prop('src')).toEqual('http://someimage.png');
    expect(img.prop('alt')).toEqual('some image');
  });
  it('does not render img when url is empty', () => {
    const wrapper = shallow(<Image url={''} alt={''} />);
    expect(wrapper.find('.image_container img')).toHaveLength(0);
  });
  it('renders no available icon when url is empty', () => {
    const wrapper = shallow(<Image url={''} alt={'some image'} />);
    const iconContainer = wrapper.find('.image_container .no_picture');
    expect(iconContainer).toHaveLength(1);
    expect(iconContainer.prop('title')).toEqual('some image');
    expect(iconContainer.find('.no_picture_icon')).toHaveLength(1);
  });
    it('renders no available icon when url is not empty but image fires onError event', () => {
        const wrapper = shallow(<Image url={'http://someimage.png'} alt={'some image'} />);
        const onError: Function = wrapper.find('img').prop('onError') as Function;
        onError();
        const iconContainer = wrapper.find('.image_container .no_picture');
        expect(iconContainer).toHaveLength(1);
        expect(iconContainer.prop('title')).toEqual('some image');
        expect(iconContainer.find('.no_picture_icon')).toHaveLength(1);
    });
  it('does not render no available icon when url is not empty', () => {
    const wrapper = shallow(<Image url={'http://someimage.png'} alt={''} />);
    expect(wrapper.find('.image_container .no_picture')).toHaveLength(0);
  });
});
