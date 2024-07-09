import {FormComponentProps} from "antd/lib/form";
import {Form} from "antd";
import React from "react";
import CreateVacationAdvancedOptions from "./CreateVacationAdvancedOptions";
import { shallow } from "enzyme";
import { defaultCheckedList, dayOptions, options } from './CreateVacationAdvancedOptions.config';

type CreateVacationAdvancedOptionsProps = FormComponentProps & {};

describe('CreateVacationAdvancedOptions component', () => {
    it('renders without crashing ', function () {
        const testComponent: React.FC<CreateVacationAdvancedOptionsProps> = ({ form }: CreateVacationAdvancedOptionsProps) => {
            const { getFieldDecorator, setFieldsValue } = form;
            return <CreateVacationAdvancedOptions
                vertical={'102'}
                getFieldDecorator={getFieldDecorator}
                onUpdatePropertyName={jest.fn}
                setDepartDaysOfWeek={jest.fn}
                setFieldsValue={setFieldsValue}
                setReturnDaysOfWeek={jest.fn}

            />
        };

        const WrappedCreateVacationAdvancedOptions= Form.create<CreateVacationAdvancedOptionsProps>({ name: 'name' })(
            testComponent
        );

        shallow(<WrappedCreateVacationAdvancedOptions />);
    });

    it('should be correct results of options', () => {
        const results = options.map(option => option.name);
        const expected = [
            'hotelAddress',
            'outboundAirline',
            'flightNumber',
            'rentalAgency',
            'carType',
            'departTime',
            'returnTime',
            'propertyName',
            'stayLength',
            'stars',
            'maxPropToFetch',
            'maxPropToStarRating',
            'boardBasis',
            'sortByPrice',
            'roomType',
            'pointOfSale',
            'ratesPerHotel',
            'custom'
        ];
        expect(results).toEqual(
            expect.arrayContaining(expected),
        );
    });

    it('dayOptions include all the necessary data', () => {
        const expected = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        expect(dayOptions).toEqual(
            expect.arrayContaining(expected),
        );
    });

    it('defaultCheckedList include all the necessary data', () => {
        const expected = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        expect(defaultCheckedList).toEqual(
            expect.arrayContaining(expected),
        );
    });
});