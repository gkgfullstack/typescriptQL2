import React from 'react';
import { shallow } from 'enzyme';
import { FormComponentProps } from "antd/lib/form";
import { Form } from "antd";
import CreateSearchByKeyword from "./CreateSearchByKeyword";


describe('CreateSearchByKeyword component ', () => {
    type CreateSearchByKeywordProps = FormComponentProps & {};

    it('renders without crashing',() => {
        const testComponent: React.FC<CreateSearchByKeywordProps> = ({form}: CreateSearchByKeywordProps) => {
            const {getFieldDecorator} = form;
            return <CreateSearchByKeyword getFieldDecorator={getFieldDecorator} />
        };

        const WrappedCreateSearchByKeyword = Form.create<CreateSearchByKeywordProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateSearchByKeyword />);
    });
});