import React from 'react';
import { shallow } from 'enzyme';
import SelectSite from './SelectSite';
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";

type SelectSiteProps = FormComponentProps & {};

describe('SelectSite component', () => {
    it('renders without crashing', () => {
        const testComponent: React.FC<SelectSiteProps> = ({ form }:SelectSiteProps) => {
            const { getFieldDecorator } = form;
            return <SelectSite
                vertical={'vertical'}
                name={'siteCode'}
                getFieldDecorator={getFieldDecorator}
                onSiteChange={jest.fn}
                isSingle={false}
            />
        };

        const WrappedSelectSiteForm = Form.create<SelectSiteProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedSelectSiteForm />);
    });
});