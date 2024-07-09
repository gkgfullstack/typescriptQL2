type MatchAttributeDetails = {
  matchCategoryName?: string;
  matchAttributeName?: string;
  ownerName?: string;
  matchAttributeMapId?: number;
  rawAttributeName?: string;
  matchAttributeId?: number;
  matchAttributeLocation?: string;
  regexParse?: string;
  ownerId?: number;
  insertTimestamp?: number;
  updateTimestamp?: number;
  normalizationsAfterRegexParse?: string;
  defaultValue?: string;
  locationPriority?: number;
  normalizationsBeforeRegexParse?: string;
  defaultMeasurementUnit?: string;
};

export default MatchAttributeDetails;
