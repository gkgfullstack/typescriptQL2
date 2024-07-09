import React from 'react';
import { shallow } from 'enzyme';
import CreateCruiseDates from './CreateCruiseDates';
import {FormComponentProps} from "antd/lib/form";
import {Form} from "antd";

describe('CreateCruiseDates component ', () => {
  type CreateCruiseDatesProps = FormComponentProps & {};

  it('renders without crashing', () => {
    const testComponent: React.FC<CreateCruiseDatesProps> = ({ form }: CreateCruiseDatesProps) => {
      const { getFieldDecorator, getFieldsValue, setFieldsValue } = form;
      return <CreateCruiseDates
          getFieldDecorator={getFieldDecorator}
          getFieldsValue={getFieldsValue}
          setFieldsValue={setFieldsValue}
      />
    };
    const WrappedCreateCruiseDates = Form.create<CreateCruiseDatesProps>({ name: 'name' })(
        testComponent
    );

    shallow(<WrappedCreateCruiseDates />);
  });
});
