import React from 'react';
import { shallow } from 'enzyme';
import CreateAutopartAdvancedOptions from "./CreateAutopartAdvancedOptions";
import { FormComponentProps } from "antd/lib/form";
import { Form } from "antd";


describe('CreateAutopartAdvancedOptions component ', () => {
    type CreateAutopartAdvancedOptionsProps = FormComponentProps & {};

    it('renders without crashing',() => {
        const testComponent: React.FC<CreateAutopartAdvancedOptionsProps> = ({form}: CreateAutopartAdvancedOptionsProps) => {
            const layout = {span: 16, offset:4};
            const {getFieldDecorator, getFieldsValue, getFieldValue, setFieldsValue} = form;
            return <CreateAutopartAdvancedOptions getFieldsValue={getFieldsValue}
                                                  getFieldValue={getFieldValue}
                                                  setFieldsValue={setFieldsValue}
                                                  getFieldDecorator={getFieldDecorator}
                                                  enableYMME={true}
                                                  layout={layout}
                                                  isDivider={true}
                                                  vertical={'163'}
                                                  searchType= {'keyword'}
            />
        };

        const WrappedCreateAutopartAdvancedOptions = Form.create<CreateAutopartAdvancedOptionsProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateAutopartAdvancedOptions />);
    });
});