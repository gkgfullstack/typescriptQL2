type DateFilterQueryParams = {
  createdStart?:any;
  createdEnd?:any;
  lastrunStart?:any;
  lastrunEnd?:any;
  finishedStart?:any;
  finishedEnd?:any;
  updatedStart?:any;
  updatedEnd?:any;
  sortingorder?: string | null;
  sortingcolumn?: string | null;
  ownerName?:string;
};
export default DateFilterQueryParams;
