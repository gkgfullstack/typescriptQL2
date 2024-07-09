import React from 'react';
import { shallow } from 'enzyme';
import {
    OriginListTooltip,
    SearchTooltipWrapper,
    ReferenceTooltip,
    SiteTooltip,
    StarsTooltip,
    MaxPropertiesTooltip,
    BrandTooltip,
    CheckOutDOWTooltip,
    ZipTooltip,
    CountryTooltip,
    StreetAddressTooltip,
    CheckInDOWTooltip,
    StateProvinceTooltip,
    ZoneIdTooltip,
    RatesTooltip,
    PropertyIDsTooltip,
    LocationTooltip,
    ProximityTooltip,
    POSTooltip,
    CompSetTooltip,
    SortByTooltip,
    PropertyNameTooltip,
    CustomTooltip,
    ZoneNameTooltip,
    CheckInTooltip,
    ProductNumberTooltip,
    SecondaryProductNumberTooltip,
    ManufacturerTooltip,
    CyberPriceReferenceTooltip,
    UsernameTooltip,
    PasswordTooltip,
    SecondPasswordTooltip,
    CyberPriceZipTooltip,
    PickupReturnTimeTooltip,
    RACTooltip,
    CarLocationTooltip,
    DiscountTooltip,
    InputValuesTooltip
} from "./CreateNewLineTooltip";

describe('create tooltips', () => {
    it('renders OriginListTooltip without crashing', () =>{
        shallow(<OriginListTooltip text={'Origin'} />);
    });

    it('renders SearchTooltipWrapper without crashing', () =>{
        const content = '';
        shallow(<SearchTooltipWrapper content={content} />);
    });

    it('renders ReferenceTooltip without crashing', () =>{
        shallow(<ReferenceTooltip text={'Reference Tooltip'} />);
    });

    it('renders SiteTooltip without crashing', () =>{
        shallow(<SiteTooltip text={'Reference Tooltip'} />);
    });

    it('renders StarsTooltip without crashing', () =>{
        shallow(<StarsTooltip text={'Reference Tooltip'} />);
    });

    it('renders BrandTooltip without crashing', () =>{
        shallow(<BrandTooltip text={'Reference Tooltip'} />);
    });

    it('renders PropertyNameTooltip without crashing', () =>{
        shallow(<PropertyNameTooltip text={'Reference Tooltip'} />);
    });

    it('renders StreetAddressTooltip without crashing', () =>{
        shallow(<StreetAddressTooltip text={'Reference Tooltip'} />);
    });

    it('renders LocationTooltip without crashing', () =>{
        shallow(<LocationTooltip text={'Reference Tooltip'} />);
    });

    it('renders StateProvinceTooltip without crashing', () =>{
        shallow(<StateProvinceTooltip text={'Reference Tooltip'} />);
    });

    it('renders ZipTooltip without crashing', () =>{
        shallow(<ZipTooltip text={'Reference Tooltip'} />);
    });

    it('renders CountryTooltip without crashing', () =>{
        shallow(<CountryTooltip text={'Reference Tooltip'} />);
    });

    it('renders CompSetTooltip without crashing', () =>{
        shallow(<CompSetTooltip text={'Reference Tooltip'} />);
    });

    it('renders PropertyIDsTooltip without crashing', () =>{
        shallow(<PropertyIDsTooltip text={'Reference Tooltip'} />);
    });

    it('renders ProximityTooltip without crashing', () =>{
        shallow(<ProximityTooltip text={'Reference Tooltip'} />);
    });

    it('renders MaxPropertiesTooltip without crashing', () =>{
        shallow(<MaxPropertiesTooltip text={'Reference Tooltip'} />);
    });

    it('renders SortByTooltip without crashing', () =>{
        shallow(<SortByTooltip text={'Reference Tooltip'} />);
    });

    it('renders ZoneIdTooltip without crashing', () =>{
        shallow(<ZoneIdTooltip text={'Reference Tooltip'} />);
    });

    it('renders RatesTooltip without crashing', () =>{
        shallow(<RatesTooltip text={'Reference Tooltip'} />);
    });

    it('renders CustomTooltip without crashing', () =>{
        shallow(<CustomTooltip text={'Reference Tooltip'} />);
    });

    it('renders POSTooltip without crashing', () =>{
        shallow(<POSTooltip text={'Reference Tooltip'} />);
    });

    it('renders ZoneNameTooltip without crashing', () =>{
        shallow(<ZoneNameTooltip text={'Reference Tooltip'} />);
    });

    it('renders CheckInTooltip without crashing', () =>{
        shallow(<CheckInTooltip text={'Reference Tooltip'} styles={{ right: '5px' }}/>);
    });

    it('renders CheckInDOWTooltip without crashing', () =>{
        shallow(<CheckInDOWTooltip text={'Reference Tooltip'} />);
    });

    it('renders CheckOutDOWTooltip without crashing', () =>{
        shallow(<CheckOutDOWTooltip text={'Reference Tooltip'} />);
    });


    it('renders ProductNumberTooltip without crashing', () =>{
        shallow(<ProductNumberTooltip text={'Reference Tooltip'} styles={{ right: '5px' }}/>);
    });

    it('renders SecondaryProductNumberTooltip without crashing', () =>{
        shallow(<SecondaryProductNumberTooltip text={'Reference Tooltip'} />);
    });

    it('renders ManufacturerTooltip without crashing', () =>{
        shallow(<ManufacturerTooltip text={'Reference Tooltip'} />);
    });


    it('renders CyberPriceReferenceTooltip without crashing', () =>{
        shallow(<CyberPriceReferenceTooltip text={'Reference Tooltip'} styles={{ right: '5px' }}/>);
    });

    it('renders UsernameTooltip without crashing', () =>{
        shallow(<UsernameTooltip text={'Reference Tooltip'} />);
    });

    it('renders PasswordTooltip without crashing', () =>{
        shallow(<PasswordTooltip text={'Reference Tooltip'} />);
    });

    it('renders SecondPasswordTooltip without crashing', () =>{
        shallow(<SecondPasswordTooltip text={'Reference Tooltip'} />);
    });

    it('renders CyberPriceZipTooltip without crashing', () =>{
        shallow(<CyberPriceZipTooltip text={'Reference Tooltip'} />);
    });

    it('renders PickupReturnTimeTooltip without crashing', () =>{
        shallow(<PickupReturnTimeTooltip text={'Reference Tooltip'} />);
    });

    it('renders RACTooltip without crashing', () =>{
        shallow(<RACTooltip text={'Reference Tooltip'} />);
    });

    it('renders CarLocationTooltip without crashing', () =>{
        shallow(<CarLocationTooltip text={'Reference Tooltip'} />);
    });

    it('renders DiscountTooltip without crashing', () =>{
        shallow(<DiscountTooltip text={'Reference Tooltip'} />);
    });

    it('renders InputValuesTooltip without crashing', () =>{
        shallow(<InputValuesTooltip text={'Reference Tooltip'} />);
    });
});
