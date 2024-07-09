import React from 'react';
import { shallow } from 'enzyme';
import CreateAutopartInputValues from "./CreateAutopartInputValues";
import { FormComponentProps } from "antd/lib/form";
import { Form } from "antd";


describe('CreateAutopartInputValues component ', () => {
    type CreateAutopartInputValuesProps = FormComponentProps & {};

    it('renders without crashing',() => {
        const testComponent: React.FC<CreateAutopartInputValuesProps> = ({form}: CreateAutopartInputValuesProps) => {
            const {getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue} = form;
            return <CreateAutopartInputValues getFieldsValue={getFieldsValue}
                                              getFieldValue={getFieldValue}
                                              setFieldsValue={setFieldsValue}
                                              getFieldDecorator={getFieldDecorator}
                                              enableYMME={true}
                                              vertical={'163'}
            />
        };

        const WrappedCreateAutopartInputValues = Form.create<CreateAutopartInputValuesProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateAutopartInputValues />);
    });
});