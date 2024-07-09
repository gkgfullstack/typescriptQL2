export type CruiseJobSearch = {
  vertical: string;
  jobId: string;
  searchName: string;
  reference: string;
  sites: string;
  dateRange: string | undefined;
  monthFromNow: string | undefined;
  adults: string;
  children: string;
  cruiseLine: string;
  cruiseShip: string;
  destinations: string;
  geo: string | null;
};
