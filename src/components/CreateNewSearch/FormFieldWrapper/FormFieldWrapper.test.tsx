import React from 'react';
import { shallow } from 'enzyme';
import FormFieldWrapper from "./FormFieldWrapper";

describe('FormFieldWrapper component', () => {
    it('renders without crashing', () =>{
        const label = (<h6>New option</h6>);
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };

        shallow(<FormFieldWrapper
            label={label}
            content={'text'}
            isDivider={false}
            layout={layout}
        />);
    })
});
