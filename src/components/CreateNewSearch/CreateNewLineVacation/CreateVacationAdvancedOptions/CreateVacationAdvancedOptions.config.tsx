import {
  CarTypeTooltip,
  FlightNumberTooltip,
  HotelAddressTooltip,
  RentalAgencyTooltip,
  SpecificOutboundTooltip,
} from 'src/components/CreateNewSearch/CreateNewLineVacation/CreateVacationTooltip/CreateVacationTooltip';
import { Input } from 'antd';
import React from 'react';
import {
  CustomTooltip,
  MaxPropertiesTooltip,
  POSTooltip,
  PropertyNameTooltip,
  RatesTooltip,
  StarsTooltip,
} from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

type timeOption = {
  [name: string]: string;
};

const getTimeOptions = (): timeOption[] => {
  const timeOptions: timeOption[] = [];
  for (let index = 0; index < 24; index++) {
    const hour: string | number = index < 10 ? `0${index}` : index;
    timeOptions.push({
      name: `${hour}:00`,
    });
  }

  return [{ name: 'Morning' }, { name: 'Afternoon' }, { name: 'Evening' }, ...timeOptions];
};

export const dayOptions = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const defaultCheckedList: string[] | CheckboxValueType[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
export const options = [
  {
    label: (
      <h6>
        Hotel Address
        <HotelAddressTooltip />
        <span>(optional)</span>
      </h6>
    ),
    name: 'hotelAddress',
    content: <Input type="text" placeholder="Please enter Hotel Address" />,
  },
  {
    label: (
      <h6>
        Specific Outbound Airline
        <SpecificOutboundTooltip />
        <span>(optional) 2 letter carrier code</span>
      </h6>
    ),
    name: 'outboundAirline',
    content: <Input type="text" placeholder="Please enter Specific Outbound Airline" />,
  },
  {
    label: (
      <h6>
        Flight Number
        <FlightNumberTooltip />
        <span>
          (optional)
          <br />
          Used in conjunction with outbound airline
        </span>
      </h6>
    ),
    name: 'flightNumber',
    content: <Input type="text" placeholder="Please enter Flight Number" />,
  },
  {
    label: (
      <h6>
        Rental Agency
        <RentalAgencyTooltip />
        <span>(optional) 2 letter RAC code</span>
      </h6>
    ),
    name: 'rentalAgency',
    content: <Input type="text" placeholder="Please enter Rental Agency" />,
  },
  {
    label: (
      <h6>
        Car Type
        <CarTypeTooltip />
        <span>(optional)</span>
      </h6>
    ),
    name: 'carType',

    content: <Input type="text" placeholder="Please enter Car Type" />,
  },
  {
    label: (
      <h6 className="tooltiplayout">
        Depart time
        <span>(optional)</span>
      </h6>
    ),
    name: 'departTime',
    content: <Input placeholder="Please enter Depart time" />,
  },
  {
    label: (
      <h6 className="tooltiplayout">
        Return time
        <span>(optional)</span>
      </h6>
    ),
    name: 'returnTime',
    content: <Input placeholder="Please enter Return time" />,
  },
  {
    label: (
      <h6 className="tooltiplayout">
        Property Name
        <PropertyNameTooltip />
        <span>(optional) Limit results to a specific hotel</span>
      </h6>
    ),
    name: 'propertyName',
    content: '',
  },
  {
    label: (
      <h6>
        Length of stay<span>(optional) Limit to trips with this number of days </span>
      </h6>
    ),
    name: 'stayLength',
    content: <Input type="number" min={0} placeholder="Please enter Length of stay" />,
  },
  {
    label: (
      <h6>
        Stars
        <StarsTooltip />
        <span>
          (optional) Limit to hotels with this star ranking
          <br /> For example, &quot; 3+&quot;
        </span>
      </h6>
    ),
    name: 'stars',
    content: <Input type="text" placeholder="Please enter Stars" />,
  },
  {
    label: (
      <h6>
        Max properties
        <MaxPropertiesTooltip />
        <span>(optional) Maximum number of properties to fetch</span>
      </h6>
    ),
    name: 'maxPropToFetch',
    content: <Input type="text" placeholder="Please enter Max properties" />,
  },
  {
    label: (
      <h6>
        Maximum Properties applies to each star rating
        <span>
          (optional) The &quot;Maximum number of properties to fetch&quot;
          <br /> applies to each star rating
        </span>
      </h6>
    ),
    name: 'maxPropToStarRating',
    content: <Input type="text" placeholder="Please enter Max properties" />,
  },
  {
    label: (
      <h6>
        Board Basis
        <span>
          (optional) Any (0), Breakfast (1), Half (2),
          <br />
          Full (3), All-Inclusive (4), Room Only (5)
        </span>
      </h6>
    ),
    name: 'boardBasis',
    content: <Input type="text" placeholder="Please enter Board Basis" />,
  },
  {
    label: (
      <h6>
        Sort By Price<span>Sort the results by Price</span>
      </h6>
    ),
    name: 'sortByPrice',
    content: <Input type="checkbox" />,
  },
  {
    label: (
      <h6>
        Room Type<span>(optional) Room Type</span>
      </h6>
    ),
    name: 'roomType',
    content: <Input type="text" placeholder="Please enter Room Type" />,
  },
  {
    label: (
      <h6>
        Point of Sale
        <POSTooltip />
        <span>
          (optional) 2-letter country code and <br /> 3-letter currency code, &quot;_&quot; delimited
        </span>
      </h6>
    ),
    name: 'pointOfSale',
    content: <Input type="text" placeholder="Please enter Point of Sale" />,
  },
  {
    label: (
      <h6>
        Rates Per Hotel
        <RatesTooltip />
        <span>(optional) Rates per hotel</span>
      </h6>
    ),
    name: 'ratesPerHotel',
    content: <Input type="checkbox" />,
  },
  {
    label: (
      <h6>
        Custom field
        <CustomTooltip />
        <span>(optional) Enter the custom parameters</span>
      </h6>
    ),
    name: 'custom',
    content: <Input type="text" placeholder="Please enter Custom field" />,
  },
];
export const timeSlots: timeOption[] = getTimeOptions();
