import React from 'react';
import { shallow } from 'enzyme';
import FormSelectWrapper from "./FormSelectWrapper";
import {FormComponentProps} from "antd/lib/form";
import {Form} from "antd";

type FormSelectWrapperProps = FormComponentProps & {};

describe('FormSelectWrapper component', () => {
    it('renders without crashing', () =>{
        const options = [{ name: 'Morning' }, { name: 'Afternoon' }, { name: 'Evening' }];
        const testComponent: React.FC<FormSelectWrapperProps> = ({ form }: FormSelectWrapperProps) => {
            const { getFieldDecorator } = form;
            return <FormSelectWrapper
                name={'name'}
                label={'Select option'}
                options={options}
                onChange= {jest.fn()}
                getFieldDecorator={getFieldDecorator}
                placeholder={'Select'}
            />
        };

        const WrappedFormSelectWrapper= Form.create<FormSelectWrapperProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedFormSelectWrapper />);
    })
});