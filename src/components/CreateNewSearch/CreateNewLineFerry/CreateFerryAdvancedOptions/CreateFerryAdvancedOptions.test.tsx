import React from 'react';
import { shallow } from 'enzyme';
import CreateFerryAdvancedOptions from './CreateFerryAdvancedOptions';
import { FormComponentProps } from "antd/lib/form";
import {Form} from "antd";

describe('CreateFerryAdvancedOptions component ', () => {
    type CreateFerryAdvancedOptionsProps = FormComponentProps & {};

    it('renders without crashing',() => {
        const testComponent: React.FC<CreateFerryAdvancedOptionsProps> = ({form}: CreateFerryAdvancedOptionsProps) => {
            const {getFieldDecorator} = form;
            return <CreateFerryAdvancedOptions getFieldDecorator={getFieldDecorator} />
        };

        const WrappedCreateFerryAdvancedOptions = Form.create<CreateFerryAdvancedOptionsProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateFerryAdvancedOptions />);
    });
});