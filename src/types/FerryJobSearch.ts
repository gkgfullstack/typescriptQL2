export type FerryJobSearch = {
  vertical: string;
  jobId: string;
  searchName: string;
  markets: string;
  reference: string;
  sites: string;
  specificFerryCompany: string;
  adults: string;
  children: string;
  vehicle: string;
  tom: string;
  cabin: string;
  DOWDepart: string;
  DOWReturn: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  dateRangeLength?: string;
};
