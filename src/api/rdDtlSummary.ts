import axios from './axiosInstances/privateAxiosInstance';
import FileTableResultType from 'src/types/FileTableResultType';
import ReportResult from 'src/types/ReportResult';
import ErrorChartType from 'src/types/ErrorChartType';
import { Sorting } from 'src/types/Sorting';
import SORT_ORDER from 'src/enums/sortOrder';
import SummaryChartType from 'src/types/SummaryChartType';


const API_URL = '/qs/result/getfilesdata';
const REPORT_API_URL = '/qs/result/getresultreportdata';
const DELETE_API_URL = '/qs/result/delete';
//const DELETEROW_API_URL = 'https://alpha-internal.ql2.com/rest/results/deleterow';
const INDEX_API_URL = '/qs/result/getpercentage';
const INPUT_API_URL = '/qs/result/getresultinput';
const ERROR_API_URL = '/qs/result/error';
const VIEW_API_URL = '/qs/result/getfilesdata';
const CIRCLECHART_API_URL = '/qs/result/getresultchart';


export type RdDtlSummaryResponse = {
  resultList: FileTableResultType;
};

export const getRdDtlSummary = (runId: string): Promise<RdDtlSummaryResponse> => {
  
  return axios.get(API_URL, {
    params: {
      runId: runId,
    },
  });
};


// reportResult.ts
export type ReportResultResponse = {
  ReportPojo: ReportResult[]
};

export const getReportResult = (runId: string): Promise<ReportResultResponse> => {
 
  return axios.get(REPORT_API_URL, {
    params: {
      runId: runId
    }
  });
};


// resultDeleteAction.ts
export type deleterows = {
  runId: string,
};
export type DeleterowResponse = {
  message: string;
};

export const getDeleterow = (deleterows: any): Promise<DeleterowResponse> => {
  
  return axios.get(DELETE_API_URL, {
    params: {
      runId: deleterows.runId,
      //deleteAction:deleterows.deleteAction,
    }
  });
};


//resultDetailsDelete.ts


// export type deleterows = {
//     runId:string,
// };
// export type DeleterowResponse = {
//    message: string;
//  };

// export const getDeleterow = (runId:string): Promise<DeleterowResponse> => {
//   return axios.get(DELETEROW_API_URL, {
//     params:{
//       runId:runId
//     }
//   });
// };


// resultIndex.ts
export type ResultIndexResponse = {
  qualityPercentage: number;
};

export const getResultIndex = (runId: string): Promise<ResultIndexResponse> => {
  
  return axios.get(INDEX_API_URL, {
    params: {
      runId: runId
    }
  });
};

// resultInput.ts
export type ResultInputResponse = {
  outputs: string;
  inputs: string;
  startdate: string;
  finisheddate: string;
};

export const getResultInput = (runId: string): Promise<ResultInputResponse> => {
 
  return axios.get(INPUT_API_URL, {
    params: {
      runId: runId
    }
  });
};



// errorChart.ts
export type ErrorLabelResponse = {
  TotalErrors: string;
  ErrorList: ErrorChartType[];
};

export const getErrorChart = (runId: string): Promise<ErrorLabelResponse> => {
  
  return axios.get(ERROR_API_URL, { params: { runId: runId } });
};


// fileTableResult.ts
type ResultlistRequest = {
  resultList:FileTableResultType[];
  offset: number;
  size: number;
  sortingorder: SORT_ORDER;
  sortingcolumn?: Sorting<FileTableResultType>['field'];
};

export type ResultlistResponse = {
  resultList: FileTableResultType[];
  totalRecords: number;
  sortingorder: string;
  sortingcolumn: string;
  size: number;
  offset: number;
};

export const getResultlist = (
  offset: number,
  size: number,
  sorting: Sorting<FileTableResultType> | null,
  runId:string,
): Promise<ResultlistResponse> => {
  let params = {
    offset: offset,
    size: size,
    runId: runId,
  } as unknown as ResultlistRequest;
  if (sorting) {
    params = {
      ...params,
      sortingorder: SORT_ORDER[sorting.order],
      sortingcolumn: sorting.field,
    } as ResultlistRequest;
  }
  console.log(params)
  return axios.get(VIEW_API_URL, {
    params:params
    
  });
};



// summaryCircleChart.ts
export type SummaryCircleResponse = {
  inputList: SummaryChartType[];
  outputList: SummaryChartType[];
  completed: string;
  completedOut:string;
};

export const getSummaryCircleChart = (runId:string): Promise<SummaryCircleResponse> => {
  return axios.get(CIRCLECHART_API_URL, {
    params:{
      runId:runId
    }
  });
};


