import React from 'react';
import { shallow } from 'enzyme';
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import CreateAutopartYMME from "./CreateAutopartYMME";

describe('WrappedCreateAutopartYMME component ', () => {
    type CreateAutopartYMMEProps = FormComponentProps & {};

    it('renders without crashing',() => {
        const testComponent: React.FC<CreateAutopartYMMEProps> = ({form}: CreateAutopartYMMEProps) => {
            const {getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue} = form;

            return <CreateAutopartYMME getFieldDecorator={getFieldDecorator}
                                       setFieldsValue={setFieldsValue}
                                       getFieldsValue={getFieldsValue}
                                       getFieldValue={getFieldValue}
                                       isDivider={true}
                                       vertical={'163'}
            />
        };

        const WrappedCreateAutopartYMME = Form.create<CreateAutopartYMMEProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateAutopartYMME />);
    });
});