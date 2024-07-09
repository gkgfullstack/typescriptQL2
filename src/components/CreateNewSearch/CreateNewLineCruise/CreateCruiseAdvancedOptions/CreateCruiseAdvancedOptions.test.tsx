import React from "react";
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { shallow } from "enzyme";
import CreateCruiseAdvancedOptions from "./CreateCruiseAdvancedOptions";
import { options } from "./CreateCruiseAdvancedOptions.config";

describe('component CreateCruiseAdvancedOptions',function() {
    type CreateCruiseAdvancedOptionsProps = FormComponentProps & {};

    it('renders without crashing',() => {
        const testComponent: React.FC<CreateCruiseAdvancedOptionsProps> = ({form}: CreateCruiseAdvancedOptionsProps) => {
            const {getFieldDecorator} = form;
            return <CreateCruiseAdvancedOptions vertical='134' getFieldDecorator={getFieldDecorator} />
        };

        const WrappedCreateCruiseAdvancedOptions = Form.create<CreateCruiseAdvancedOptionsProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateCruiseAdvancedOptions />);
    });

    it('Should be correct names of fields for Advanced Options of Ferry widget', () => {
        const fieldOptions = options;
        expect(fieldOptions[0].name).toBe('adults');
        expect(fieldOptions[1].name).toBe('children');
        expect(fieldOptions[2].name).toBe('cruiseLine');
        expect(fieldOptions[3].name).toBe('cruiseShip');
    })
});