import { shallow } from "enzyme";
import CreateVacationTraveler from "./CreateVacationTraveler";
import React from "react";
import { FormComponentProps } from "antd/lib/form";
import { Form } from "antd";

type CreateVacationTravelerProps = FormComponentProps & {};

describe('CreateVacationTraveler component', () => {
    it('renders without crashing ', function () {
        const testComponent: React.FC<CreateVacationTravelerProps> = ({ form }: CreateVacationTravelerProps) => {
            const { getFieldDecorator } = form;
            return <CreateVacationTraveler
                getFieldDecorator={getFieldDecorator}
            />
        };

        const WrappedCreateVacationTravelerForm = Form.create<CreateVacationTravelerProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateVacationTravelerForm />);
    });
});