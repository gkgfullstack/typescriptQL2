type AuditHistoryInfo = {
  auditHistoryList: string;
  Status: string;
  ProductUrl: string;
  RequestType: string;
  InsertTimestamp: string;
  SrcProductId: string;
  SrcProductName: number;
  CompetitorSite: string;
  CompetitorProductId: string;
  CompetitorProductName: string;
  reporter?: string;
  reason?: string;
  requestCompletedTimestamp?: string;
  matchType?: string;
  products: string;
};

export default AuditHistoryInfo;
