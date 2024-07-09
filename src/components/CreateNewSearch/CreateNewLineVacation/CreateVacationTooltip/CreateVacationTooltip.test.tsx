import React from 'react';
import { shallow } from 'enzyme';
import { HotelAddressTooltip, SpecificOutboundTooltip, FlightNumberTooltip, RentalAgencyTooltip, CarTypeTooltip } from "./CreateVacationTooltip";

describe('create tooltips', () => {
    it('renders HotelAddressTooltip without crashing', () =>{
        shallow(<HotelAddressTooltip />);
    });

    it('renders SpecificOutboundTooltip without crashing', () =>{
        shallow(<SpecificOutboundTooltip />);
    });

    it('renders FlightNumberTooltip without crashing', () =>{
        shallow(<FlightNumberTooltip />);
    });

    it('renders RentalAgencyTooltip without crashing', () =>{
        shallow(<RentalAgencyTooltip />);
    });

    it('renders CarTypeTooltip without crashing', () =>{
        shallow(<CarTypeTooltip />);
    });
});
