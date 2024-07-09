import React from 'react';
import { Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/pro-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const faQuestionCirclePropIcon = faQuestionCircle as IconProp;

type TooltipProps = {
  text?: string;
  styles?: { [key: string]: string };
};

type SearchTooltipWrapper = {
  content: any;
  styles?: { [key: string]: string };
};

export const SearchTooltipWrapper: React.FC<SearchTooltipWrapper> = ({ content, styles }: SearchTooltipWrapper) => {
  return (
    <span className="cnjobs" style={{ cursor: 'pointer', ...styles }}>
      <Popover placement="top" content={content}>
        <FontAwesomeIcon icon={faQuestionCirclePropIcon} className="tooltipPopover" />
      </Popover>
    </span>
  );
};

export const OriginListTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        An O&D is a string made up of an origin and destination, separated by a dash:
        <br />
        <br />
        Origin_name - Dest_name
        <br />
        In most cases the origin and destination are three-letter airport codes. For example, an O&D entry for a flight
        from Seattle (SEA) to Phoenix (PHX) would be SEA-PHX.
        <br />
        You can enter as many of these as you need for your Market Collection, but enter only one O&D combination per
        line.
      </p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const ReferenceTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>This is a free form field you can use for sorting, formatting or filtering your output.</p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const SiteTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Use the site code picker or enter the two-or-three character site codes separated by a comma for each of the
        sites for which you are enabled to retrieve fare information.
        <br />
        <br /> For example if we want to create a market collection for site &quot;Cebu Pacific Air&quot; then we need
        to enter &quot;5j&quot; as an input in site field.
      </p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const StarsTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter the star rating you want to shop.
        <br />
        <br />
        You may enter a single digit (1 - 5) to retrieve all properties matching that exact star level. Or, enter a
        single digit with a plus sign to retrieve all properties with that star level and above, such as &quot;2+&quot;.
        <br />
        <br />
        If you do not enter anything &quot;1+&quot; will be assumed.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const BrandTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>Enter the brand name of properties you want to shop. Examples are Marriott, Hilton, Sheraton, etc.</p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const PropertyNameTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter a property name in this field only when shopping for rates for a specific property.
        <br />
        <br />
        To match a specific property, the property name must be entered exactly as it appears on the target site. If it
        does not match, all properties matching the other retrieval criteria will be retrieved.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const StreetAddressTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter the street address in this field only when searching for a specific property or for establishing the focal
        point for shopping within a defined proximity. No need to enter city, state, and postal code.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const LocationTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        A city name or a three character airport code of the area you want to shop.
        <br />
        <br />
        Check the box below this field if you are using an airport code.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const StateProvinceTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>If shopping by city name in the US or Canada you must enter the two character state or province code.</p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const ZipTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter this only when searching for a specific property or for establishing the focal point for shopping within a
        defined proximity. To be effective, it must be used with the address field.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const CountryTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        If shopping by city outside the US or Canada you must enter the country name where the city is located.
        <br />
        <br />
        This entry must match the country name as it appears on the site you are targeting.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const CompSetTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Instead of choosing individual property id, optionally you can create a list of &quot;comp set&quot; with
        different property IDs.
        <br />
        <br />
        If you have not created a &quot;comp set&quot;, the &quot;Competitive Set Names&quot; list will be empty.
        <br />
        <br />
        To create a &quot;comp set&quot;, please reach out to your Account Manager.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const PropertyIDsTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Some websites have unique numeric identifiers associated with a hotel property. If you want to collect data for
        a property using one of those IDs, enter them here.
        <br />
        The syntax is: ^site:ID. For example, &quot;^YY:12345&quot;.
        <br />
        <br />
        You may enter as many IDs as you wish, but only list one ID per line.
        <br />
        <br />
        In addition to the site-specific IDs, we also have our own set of IDs which allow us to collect several
        site-specific IDs under one unified ID. These start with &quot;^QL:&quot;. The advantage of these IDs is that
        they ensure that you are referring to the exact same property, regardless of the website being scraped.
        <br />
        <br />
        If you want to search our extensive hotel property database, click on the &quot;Search&quot; picker above the
        property ID box. Without having to leave the page, a search form will appear, allowing you to enter partial
        search parameters. When you submit the form, up to 500 matching records are returned. Then you simply click on
        the IDs you want, and they are added to the property list.
        <br />
        <br />
        At the top level, the Search results show the &quot;QL&quot; style IDs. But if you click on the
        &lbrack;+&rbrack; button in the results, a panel will appear that shows the site-specific identifiers which are
        mapped to that ID. If you prefer these to the &quot;QL&quot; IDs, you may click on any of those IDs to include
        them in your Market Collection.
        <br />
        <br />
        When the property IDs are added to the Market Collection, the address fields will be filled out so that you can
        know which property each ID refers to.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const ProximityTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        The distance in miles from the shopping focal point. This will always be 15 miles unless an airport code or
        address is entered. If either an address or an airport code is entered you may enter a value other than 15.
        <br />
        Some sites (Travelocity and Hotels.com) allow wide shopping proximity. Others (Orbitz and Expedia) allow limited
        proximity.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const MaxPropertiesTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        This is the total number of properties that will be retrieved for the shopping parameters entered above. If
        nothing is entered, 25 will be assumed.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const SortByTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>Select result sort order on page before data collection.</p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const ZoneIdTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        This is a reference field used only when entering Market Collection Entries targeting HotWire.
        <br />
        <br />
        The Zone ID has no effect on what is retrieved. It is displayed in the output and may be used for filtering or
        sorting.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const RatesTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      There are two choices for the rates to be retrieved for each property:
      <ul>
        <li>
          <b>A</b> for all rates.
        </li>
        <li>
          <b>L</b> for lowest rate.
        </li>
        <li>
          <b>R</b> for the lowest rate per room type
        </li>
      </ul>
      <p>
        If nothing is selected, <b>A</b> will be assumed.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const CustomTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>The meaning of the values stored in this field are site-specific.</p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const POSTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter the two-letter country code for POS (Point Of Sale). This is used to designate the country of residence of
        the renter and may effect the rate and currency. This feature is not enabled for all sites (call QL2 for
        details).
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const ZoneNameTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        This is used to specify a geographic zone within a location on the HotWire site.
        <br />
        <br />
        The zone name must be entered exactly as it appears on the HotWire site or an error will be displayed in the
        error file.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const CheckInTooltip: React.FC<TooltipProps> = ({ styles }: TooltipProps) => {
  const text = (
    <div className="contentsss">
      You may enter dates in any of the following ways:
      <ul>
        <li>
          <b>Actual date:</b> Syntax is DD-MM-YY, MM/DD/YY, or YYYYMMDD.
        </li>
        <li>
          <b>Days in the future:</b> For example, <b>1</b> for next day check in; <b>7</b> for check in one week from
          today, etc.
        </li>
        <li>
          <b>Weeks in the future:</b> For example, <b>2W</b> for two weeks.
        </li>
      </ul>
      <p>
        In the days-in-future and weeks-in-future notation, you may also specify an optional day of week with a
        two-letter weekday abbreviation (MO, TU, WE, TH, FR, SA, SU). For example, if you enter <b>5 TH</b>, QL2 will
        first look five days in the future and determine the date and day of the week. If the date matches the day of
        the week QL2 will shop for rates on that date. If it does not match the day of the week it will automatically
        look for the next date where the specified day of week falls.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} styles={styles} />;
};

export const CheckInDOWTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        <b>Filtering by day of week</b>
        <br />
        Select the days of week that you want to include in your queries. Dates which are omitted from your filter will
        not queried when your script runs.
        <br />
        <br />
        If you leave all days out, no filtering will be performed, which is identical to including all seven days of the
        week.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};

export const CheckOutDOWTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        <b>Filtering by day of week</b>
        <br />
        Select the days of week that you want to include in your queries. Dates which are omitted from your filter will
        not queried when your script runs.
        <br />
        <br />
        If you leave all days out, no filtering will be performed, which is identical to including all seven days of the
        week.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};
export const WeekPickupTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        <b>Filtering by week of month</b>
        <br />
        Select the weeks of month that you want to include in your queries. Dates which are omitted from your filter will not be queried when your script runs.<br />
        <br />
        If you leave all weeks out, no filtering will be performed, which is identical to including all week of the month.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} />;
};


export const ProductNumberTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter the primary part number of the item for which you want pricing information.
        <br />
        <br />
        Typically, this is the part number assigned to an item by the owner of the target site. It is often identical or
        similar to the part number assigned by the manufacturer of the item.
      </p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const SecondaryProductNumberTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter the secondary part number of the item for which you want pricing information.
        <br />
        <br />
        This is an alternate part number to access an item on the target site. It is often, but not necessarily the
        manufacturers part number.
      </p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const ManufacturerTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        Enter the name of a product manufacturer.
        <br />
        <br />
        If entered with a primary or secondary part number, this will be used to match the manufacturers name returned
        by the site.
        <br />
        <br />
        If it is entered by itself it will be used to retrieve all products on the site produced by this manufacturer.
        <br />
        <br />
        If it is entered in conjunction with a product category in the Product Category Path field below, it is used to
        retrieve all products produced by this manufacturer within the product category entered.
        <br />
        <br />
        These features are not enabled for all sites (call QL2 for details).
      </p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const CyberPriceReferenceTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        This is an optional field that has no impact on the pricing information. It will be included in the output and
        can be used for sorting and/or filtering.
      </p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const UsernameTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        This is an optional field that allows you to specify a username that some scripts may require for accessing a
        site.
      </p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const PasswordTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        This is an optional field that allows you to specify a user password that some scripts may require for accessing
        a site.
      </p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const SecondPasswordTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>
        This is an optional field that allows you to specify a second password that some scripts may require for
        accessing a site.
      </p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const CyberPriceZipTooltip: React.FC<TooltipProps> = () => {
  const text = (
    <div className="contentsss">
      <p>This is an optional field that lets you specify a zipcode for the search.</p>
    </div>
  );

  return <SearchTooltipWrapper content={text} />;
};

export const PickupReturnTimeTooltip: React.FC<TooltipProps> = ({ styles }: TooltipProps) => {
  const text = (
    <div className="contentsss">
      <p>Valid values: 00:00, 00:30, 01:00, 01:30 ...... 23:30 or empty string i.e no value.</p>
    </div>
  );
  return <SearchTooltipWrapper content={text} styles={styles} />;
};

export const RACTooltip: React.FC<TooltipProps> = ({ styles }: TooltipProps) => {
  const text = (
    <div className="contentsss">
      <p>
        Two character rental car codes (zi, ze, al, et, etc.) separated by a space.
        <br />
        <br />
        This should only be used when shopping for specific RACs on travel sites such as Expedia, Travelocity, or
        Orbitz. If you want to see rates for all RACs listed on a travel site, leave this field blank.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} styles={styles} />;
};

export const CarLocationTooltip: React.FC<TooltipProps> = ({ styles }: TooltipProps) => {
  const text = (
    <div className="contentsss">
      <p>
        Enter the three character codes (typically airport codes) for each location you wish to search and want the drop
        off You can enter as many of these as you need for your Market Collection, pressing the ADD key.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} styles={styles} />;
};

export const DiscountTooltip: React.FC<TooltipProps> = ({ styles }: TooltipProps) => {
  const text = (
    <div className="contentsss">
      <p>
        Some sites accept corporate and government discount codes. In most cases, they allow one discount code per
        search.
        <br />
        <br />
        These can be entered in this field preceded by the two character RAC code where the discount applies and an
        underscore. Example: zr_508884.
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} styles={styles} />;
};

export const InputValuesTooltip: React.FC<TooltipProps> = ({ styles }: TooltipProps) => {
  const text = (
    <div className="contentsss">
      <p>
        Enter your extraction parameters. Each parameter must be separated with a comma (,) with no spaces before or
        after the comma.
        <br />
        <br />
        These parameters are in a predefined format that is specific to your selection in <b>Site</b>. If you are
        uncertain of the format to use, contact{' '}
        <address>
          <a href="mailto:support@ql2.com">support@ql2.com</a>
        </address>
      </p>
    </div>
  );
  return <SearchTooltipWrapper content={text} styles={styles} />;
};
