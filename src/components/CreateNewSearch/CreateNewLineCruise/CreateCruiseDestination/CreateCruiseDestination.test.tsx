import React from "react";
import { shallow } from "enzyme";
import { Button, Input } from "antd";
import CreateCruiseDestination from "./CreateCruiseDestination";

describe('CreateCruiseDestination component', function () {
    const destinations = ['Milan', 'Rome', 'Florence'];
    const wrapper = shallow(<CreateCruiseDestination setDestinations={jest.fn} destinations={destinations}/>);

    it('should be at least one input', () => {
        expect(wrapper.find(Input)).toHaveLength(1);
    });

    it('Input label is Please enter Destination', () => {
        expect(
            wrapper
                .find(Input)
                .at(0)
                .prop('placeholder')
        ).toBe('Please enter Destination');
    });

    it('Should be one Button Add', () => {
        expect(wrapper.find('.ant-form-item').find(Button)).toHaveLength(1);
        expect(wrapper.find(Button).at(0).prop('children')).toBe('Add');
    });
});