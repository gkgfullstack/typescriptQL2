import React from 'react';
import { shallow } from 'enzyme';
import CreateAutopartSearchType from './CreateAutopartSearchType';
import { FormComponentProps } from "antd/lib/form";
import {Form} from "antd";

describe('CreateAutopartSearchType component ', () => {
    type CreateAutopartSearchTypeProps = FormComponentProps & {};

    it('renders without crashing',() => {
        const testComponent: React.FC<CreateAutopartSearchTypeProps> = ({form}: CreateAutopartSearchTypeProps) => {
            const {getFieldDecorator} = form;
            return <CreateAutopartSearchType getFieldDecorator={getFieldDecorator} setSearchType={jest.fn} />
        };

        const WrappedCreateAutopartSearchType = Form.create<CreateAutopartSearchTypeProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateAutopartSearchType />);
    });
});