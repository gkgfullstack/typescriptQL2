import React from 'react';
import { SearchTooltipWrapper } from 'src/components/CreateNewSearch/CreateNewLineTooltip/CreateNewLineTooltip';

export type TooltipProps = {
  content?: string;
};
const contentsss1 = (
  <div className="contentsss">
    <p>
      Use the site code picker or enter the two-or-three character site codes separated by a comma for each of the sites
      for which you are enabled to retrieve fare information.
      <br />
      <br /> For example if we want to create a market collection for site 'Cebu Pacific Air' then we need to enter '5j'
      as an input in site field.
    </p>
  </div>
);
const contentsss2 = (
  <div className="contentsss">
    <p>This is a free form field you can use for sorting, formatting or filtering your output.</p>
  </div>
);
const contentsss3 = (
  <div className="contentsss">
    <p>
      An O&D is a string made up of an origin and destination. In most cases the origin and destination are three-letter
      airport codes.
      <br />
      <br />
      For example, an O&D entry for a flight from Seattle (SEA) to Phoenix (PHX) would be SEAPHX. You can enter as many
      of these as you need for your Market Collection, but enter only one O&D combination per line.
    </p>
  </div>
);

const contentsss4 = (
  <div className="contentsss">
    <p>
      These are checkboxes for commonly used advance purchase categories. The column on the left represents a departure
      date of corresponding to the number displayed relative to todays date and a return date corresponding to that
      number plus one. For example, if you check the 7 box your Market Collection will retrieve a fare assuming a
      departure 7 days from today and a return 8 days from today.
      <br />
      <br />
      Each field in the column on the right has an S next to its number indicating a Saturday night stay. The departure
      date is calculated as described above, however, the return date is that number plus seven.
    </p>
  </div>
);

const contentsss6 = (
  <div className="contentsss">
    <p>
      This option is only used when retrieving fares from travel sites. You use it to specify retrieval of fares from
      specific airlines.
    </p>
    <p>Enter the two character carrier codes separated by a space for each airline you want to specify.</p>
  </div>
);
const contentsss7 = (
  <div className="contentsss">
    Options are:
    <ul>
      <li>
        <b>E</b> for Economy (the default)
      </li>
      <li>
        <b>B</b> for Business Class
      </li>
      <li>
        <b>F</b> for First Class
      </li>
      <li>
        <b>P</b> for Premium
      </li>
    </ul>
    <p>A handful of sites also recognize an additional modifier letter for Economy:</p>
    <ul>
      <li>
        <b>ER</b> for Economy Refundable
      </li>
      <li>
        <b>EN</b> for Economy Nonrefundable
      </li>
      <li>
        <b>EP</b> for Economy Premium
      </li>
      <li>
        <b>ES</b> for Economy Standard
      </li>
      <li>
        <b>EB</b> for Economy Basic
      </li>
    </ul>
    <p>
      The flight class option is only available for specific sites. If the option is not available for a site you
      specify in the Sites field, the Economy fare will be retrieved regardless of your entry in this field.
    </p>
  </div>
);
const contentsss8 = (
  <div className="contentsss">
    <p>
      Enter 1 - 9. The default is 1.
      <br />
      This option is only available for specific sites. If the option is not available for a site you specify in the
      Sites field, the single passenger fare will be retrieved regardless of entry.
    </p>
  </div>
);

const contentsss9 = (
  <div className="contentsss">
    <p>
      Check this box to query only for non-stop flights, or leave unchecked to allow both non-stop and multiple-stop
      flights.
    </p>
  </div>
);
const contentsss10 = (
  <div className="contentsss">
    <p>
      Enter the specific stops, between 0 and 9. Or leave the field empty.
      <br />
      This is an advanced option which is not supported on most sites.
    </p>
  </div>
);

const contentsss11 = (
  <div className="contentsss">
    <p>
      The depart/return times must be formatted HH:MM (such as "17:45") or left empty.
      <br />
      You can specify a range as "HH:MM-HH:MM". For example if you want to allow times between 9am and 1:45pm, use
      "09:00-13:45".
      <br />
      These fields are optional and might be ignored for many sites.
    </p>
  </div>
);
const contentsss12 = (
  <div className="contentsss">
    <p>
      The depart/return times must be formatted HH:MM (such as "17:45") or left empty. You can specify a range as
      "HH:MM-HH:MM". For example if you want to allow times between 9am and 1:45pm, use "09:00-13:45".
      <br />
      These fields are optional and might be ignored for many sites.
    </p>
  </div>
);
const contentsss13 = (
  <div className="contentsss">
    <p>
      By default most sites search by Fare only. However on a small handful of sites, you can adjust the type of search
      performed:
    </p>
    <ul>
      <li>
      <b>F:</b>  Search by Fare, This is the default.
      </li>
      <li>
      <b>N:</b> Sort by Site.
      </li>
      <li>
        <b>B:</b>  Sort by Best.
      </li>
      <li>
        <b>L:</b>  Sort by Lowest Price.
      </li>
    </ul>
    <p>This is an advanced option which is not supported on most sites.</p>
  </div>
);
const contentsss14 = (
  <div className="contentsss">
    <p>
      Enter a point-of-sale.
      <br />
      This is an advanced option which is not supported on most sites.
    </p>
  </div>
);
const contentsss15 = (
  <div className="contentsss">
    <p>
      To include codeshare flights, leave this option checked. To exclude codeshare flights, uncheck this option.
      <br />
      This is an advanced option which is not supported on most sites.
    </p>
  </div>
);
const contentsss16 = (
  <div className="contentsss">
    <p>
      This is an optional parameter and will be used to specify the two character country code when the user wants to
      specify the geography for a particular lineitem.
    </p>
  </div>
);

export const PointOfSaleTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter the two-letter country code for POS (Point Of Sale). This is used to designate the country of residence of
        the renter and may effect the rate and currency.
        <br />
        This feature is not enabled for all sites (call QL2 for details)
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const Contentsss1Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss1} />;
};

export const Contentsss2Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss2} />;
};

export const Contentsss3Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss3} />;
};

export const Contentsss4Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss4} />;
};

export const Contentsss6Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss6} />;
};

export const Contentsss7Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss7} />;
};

export const Contentsss8Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss8} />;
};

export const Contentsss9Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss9} />;
};

export const Contentsss10Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss10} />;
};

export const Contentsss11Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss11} />;
};

export const Contentsss12Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss12} />;
};

export const Contentsss13Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss13} />;
};

export const Contentsss14Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss14} />;
};

export const Contentsss15Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss15} />;
};

export const Contentsss16Pop: React.FC<TooltipProps> = () => {
  return <SearchTooltipWrapper content={contentsss16} />;
};
