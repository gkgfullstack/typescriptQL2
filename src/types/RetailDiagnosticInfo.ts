type RetailDiagnosticInfo = {
  siteName?: string;
  schemaName?: string;
  ID: string;
  name: string;
  searchType?: string;
  dataStatus?: string;
  insertTimestamp?: string;
  completeTimestamp?: string;
  totalRunTime?: string;
  searchStatus?: string;
  externalSubscriberID?: string;
  status?: string;
  collectionType?: string;
  archiveCorrelationID?: string;
  cleansed?: number;
};

export default RetailDiagnosticInfo;
