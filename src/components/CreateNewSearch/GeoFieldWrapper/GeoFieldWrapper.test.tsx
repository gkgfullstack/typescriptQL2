import React from "react";
import { Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { shallow } from "enzyme";
import GeoFieldWrapper from "./GeoFieldWrapper";

describe('component GeoFieldWrapper',function() {
    type GeoFieldWrapperProps = FormComponentProps & {};

    it('renders without crashing',() => {
        const testComponent: React.FC<GeoFieldWrapperProps> = ({form}: GeoFieldWrapperProps) => {
            const {getFieldDecorator} = form;
            return <GeoFieldWrapper vertical={'123'} id='geo' getFieldDecorator={getFieldDecorator} />
        };

        const WrappedGeoFieldWrapper = Form.create<GeoFieldWrapperProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedGeoFieldWrapper />);
    });

});