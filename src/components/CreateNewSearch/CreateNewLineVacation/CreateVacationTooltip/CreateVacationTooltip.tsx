import React from 'react';
import { SearchTooltipWrapper } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

type TooltipProps = { content?: string };

export const HotelAddressTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter the address of any hotel you want to watch against hotels returned in the search results.
        <br />
        <br />
        QL2 will return all the properties for the specified destination and will put a &quot;1&quot; in the Matcher
        column of the output if the hotel address on the site matches the address entered.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const SpecificOutboundTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter a two character airline code to search for package prices meeting the destination and date parameters and
        include this airline.
        <br />
        <br />
        If there are no packages available that include this airline there will be an error message in the output files.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const FlightNumberTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter the flight number of the airline specified in the Specific Outbound Airline field. QL2 will only search
        for packages meeting the destination and date parameters that include the specified airline and flight number.
        <br />
        <br />
        If there are no packages available that include this airline and/or flight number there will be an error message
        in the output files.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const RentalAgencyTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter a two character rent-a-car company code to search for package prices meeting the destination and date
        parameters and include this rent-a-car company.
        <br />
        <br />
        If there are no packages available that include this rent-a-car company there will be an error message in the
        output files.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const CarTypeTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      Enter the car type exactly as it is expected on the target site or as it is listed below:
      <ul>
        <li>economy</li>
        <li>compact</li>
        <li>midsize</li>
        <li>standard</li>
        <li>full size</li>
        <li>luxury</li>
        <li>convertible</li>
        <li>suv</li>
        <li>minivan</li>
      </ul>
      <p>
        QL2 will only search for packages meeting the destination and date parameters and include the specified car
        type.
        <br />
        <br />
        If there are no packages available that include this car type, there will be an error message in the output
        files.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const AdultsTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      Enter the number of adults in the vacation party.
      <br />
      Each site will have different limits on the number of adults + children the site will accept.
      <br />
      If a number is entered outside the limit for a given site there will be an error message when the Vacation entry
      is submitted.
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const ChildrenTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      Enter the number of children in the vacation party.
      <br />
      Each site will have different limits on the number of adults + children the site will accept.
      <br />
      If a number is entered outside the limit for a given site, there will be an error message when the Vacation entry
      is submitted.
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const RoomsTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      Enter the number of rooms requested to accommodate the vacation party.
      <br />
      Each site will have different limits on the number of rooms and the number of people per room the site will
      accept.
      <br />
      Some sites will also allow the user to specify the number of adults and children per room.
      <br />
      For those sites, QL2 will automatically distribute the adults and children as evenly as possible across the
      specified rooms.
      <br />
      If a number is entered outside the limit for a given site there will be an error message when the Vacation entry
      is submitted.
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const AirportCodeTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      Enter the three digit airport code from where the vacation originates.
      <br />
      This may be left blank if doing a hotel and car search.
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const DestinationsTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      Enter the destination exactly as the target web site expects it or enter a destination preceded by an * for the
      most commonly shopped destinations (example *Las Vegas).
      <br />
      QL2 will automatically enter the destination correctly into each site when the * precedes the destination for the
      most popular destinations only.
      <br />
      For a list of the most popular destinations contact <a href="mailto: support@ql2.com">support@ql2.com</a> or call
      QL2 Support at 1-800-750-8830.
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const DayOfWeekTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      Select the days of week that you want to include in your queries. Dates which are omitted from your filter will
      not queried when your script runs.
      <br />
      If you leave all days out, no filtering will be performed, which is identical to including all seven days of the
      week.
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const SearchTypeTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      This is where the type of package to shop can be designated.
      <br />
      Allowable entries are FH for flight and hotel; FHC for flight, hotel, and car; HC for hotel and car; and FSH for
      flight, cruise and hotel.
      <br />
      Some of the sites do not allow all of these options.
      <br />
      If an option is entered that a site does not allow, there will be an error message in the output files.
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const DaysInFutureTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      This form of date entry allows you to generate a series of dates in one easy operation.
      <br />
      Specify a date range by entering First and Last Departure Dates as absolute dates (MM/DD/YY) or as Days in Future.
      Enter desired length of stay for each date combination in the Length of Stay box. Multiple lengths of stay can be
      entered, separated by spaces or commas.
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const ActualDatesTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      This field allows one set of dates per line separated by a space, and can be used along with, or in place of, the
      Shopping Dates.
      <br />
      The format is days out or locale specific dare format (US is MM/DD/YY).
      <br />
      Example: To retrieve rental rates picking up 60 days out with a one week rental, you would enter "60 67" then use
      the enter key on your keyboard to go to the next line.
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};
