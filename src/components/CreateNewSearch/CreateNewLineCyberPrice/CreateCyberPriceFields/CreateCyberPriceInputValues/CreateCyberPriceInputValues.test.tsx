import React from "react";
import { shallow } from "enzyme";
import { FormComponentProps } from "antd/lib/form";
import { Form } from "antd";
import { options } from './CreateCyberPriceInputValues.config';
import CreateCyberPriceInputValues from './CreateCyberPriceInputValues';
import {
    ManufacturerTooltip,
    ProductNumberTooltip,
    CyberPriceReferenceTooltip, SecondaryProductNumberTooltip,
    CyberPriceZipTooltip
} from "src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip";

describe('component CreatePriceInputValues', () => {
    type CreateCyberPriceInputValuesProps = FormComponentProps & {};

    it('renders without crashing', () => {
        const testComponent: React.FC<CreateCyberPriceInputValuesProps> = ({ form }: CreateCyberPriceInputValuesProps) => {
            const {getFieldDecorator} = form;
            return <CreateCyberPriceInputValues
                getFieldDecorator={getFieldDecorator}
                onAdd={jest.fn}
            />
        };
        const WrappedCreateCyberPriceInputValues = Form.create<CreateCyberPriceInputValuesProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateCyberPriceInputValues />);
    });

    it('Should be correct labels of fields for Input Value Options of CyberPrice widget', () => {
        const inputOptions = options;
        expect(inputOptions[0].label).toStrictEqual(<h6>Keyword / Product Number <ProductNumberTooltip /></h6>);
        expect(inputOptions[1].label).toStrictEqual(<h6>Secondary Product Number <SecondaryProductNumberTooltip /></h6>);
        expect(inputOptions[2].label).toStrictEqual(<h6>Manufacturer <ManufacturerTooltip /></h6>);
        expect(inputOptions[3].label).toStrictEqual(<h6>Reference<CyberPriceReferenceTooltip /></h6>);
        expect(inputOptions[4].label).toStrictEqual(<h6>Zip Code<CyberPriceZipTooltip /></h6>);
    });

    it('Should be correct names of fields for Input Value Options of CyberPrice widget', () => {
        const inputOptions = options;
        expect(inputOptions[0].name).toBe('productNumber');
        expect(inputOptions[1].name).toBe('secondaryProductNumber');
        expect(inputOptions[2].name).toBe('manufacturer');
        expect(inputOptions[3].name).toBe('reference');
        expect(inputOptions[4].name).toBe('zipCode');
    });
});