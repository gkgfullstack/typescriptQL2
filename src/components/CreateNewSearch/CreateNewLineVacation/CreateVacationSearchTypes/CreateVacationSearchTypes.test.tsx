import React from 'react';
import { shallow } from 'enzyme';
import CreateVacationSearchTypes from './CreateVacationSearchTypes';
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";

type CreateVacationSearchTypesProps = FormComponentProps & {};

describe('CreateVacationSearchTypes component', () => {
    it('renders without crashing', () => {
        const testComponent: React.FC<CreateVacationSearchTypesProps> = ({ form }: CreateVacationSearchTypesProps) => {
            const { getFieldDecorator } = form;
            return <CreateVacationSearchTypes
                getFieldDecorator={getFieldDecorator}
                onSearchTypeChange={jest.fn}
            />
        };

        const WrappedCreateVacationSearchTypesForm = Form.create<CreateVacationSearchTypesProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateVacationSearchTypesForm />);
    });
});