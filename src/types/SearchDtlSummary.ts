type SearchDtlSummary = {
  applicationName?: string;
  ownerName?: string;
  jobName?: string;
  createdAt?: string;
  totalInput?: Number;
  totalOutput?: Number;
  estimatedTime?: string;
  status?: string;
  dwnLdType?:string;
  timeZone?:string;
  checkview?:string;
  checkdownload?:string;
};

export default SearchDtlSummary;
