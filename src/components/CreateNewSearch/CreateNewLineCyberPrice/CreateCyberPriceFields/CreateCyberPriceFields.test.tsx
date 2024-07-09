import React from "react";
import { shallow } from "enzyme";
import { FormComponentProps } from "antd/lib/form";
import { Form } from "antd";
import CreateCyberPriceFields from './CreateCyberPriceFields';

describe('CreateCyberPriceFields component', () => {
    type CreateCyberPriceFieldsProps = FormComponentProps & {};

    it('renders without crashing', () => {
        const testComponent: React.FC<CreateCyberPriceFieldsProps> = ({ form }: CreateCyberPriceFieldsProps) => {
            const { getFieldDecorator, getFieldsValue, setFieldsValue } = form;
            return <CreateCyberPriceFields
                getFieldDecorator={getFieldDecorator}
                getFieldsValue={getFieldsValue}
                setFieldsValue={setFieldsValue}
                onSetInputValues={jest.fn()}
            />
        };
        const WrappedCreateCyberPriceFields = Form.create<CreateCyberPriceFieldsProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateCyberPriceFields />);
    });
});