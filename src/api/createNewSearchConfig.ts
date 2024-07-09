import axios from './axiosInstances/privateAxiosInstance';
import AirFareLineItemType from 'src/types/AirFareLineItemType';

const API_URL = '/qs/searches/addnewjobname';
const API_URL_AIRFARE = '/qs/searches/addlineitemsforairfare';
const API_URL_CAR_RENTAL = '/qs/searches/addlineitemsforcar';

export type SearchNameRequest = {
  SearchName: string;
  vertical: string;
};

export type JobNameResponse = {
  success: boolean;
  message: string;
  value: number;
};

export type AirFareLineItemResponse = {
  success: boolean;
  message: string;
  value: number;
};

export const getJobSearchAction = (searchNameRequest: SearchNameRequest): Promise<JobNameResponse> => {
  return axios.get(API_URL, {
    params: {
      vertical: searchNameRequest.vertical,
      SearchName: searchNameRequest.SearchName,
    },
  });
};

export const getAirFareJobSearchAction = (
  airFareLineItem: AirFareLineItemType,
  isCarRental?: boolean
): Promise<AirFareLineItemResponse> => {
  const url = isCarRental ? API_URL_CAR_RENTAL : API_URL_AIRFARE;

  let specapDt = '';
  let directOnly = '0';
  let ap1 = undefined;
  let ap7 = undefined;
  let ap14 = undefined;
  let ap21 = undefined;
  let ap28 = undefined;
  let ap1s = undefined;
  let ap7s = undefined;
  let ap14s = undefined;
  let ap21s = undefined;
  let ap28s = undefined;
  let sIncCodeshares = '0';

  if (airFareLineItem.specap1 !== undefined && airFareLineItem.specap1 != null) {
    specapDt = airFareLineItem.specap1 + ' ' + airFareLineItem.specap2;
  }
  if (airFareLineItem.dateRange) {
    specapDt = airFareLineItem.dateRange;
  }
  if (airFareLineItem.sDirectOnly !== undefined) {
    if (airFareLineItem.sDirectOnly === 'true') {
      directOnly = '1';
    } else {
      directOnly = '0';
    }
  }
  if (airFareLineItem.sDirectOnly !== undefined) {
    if (airFareLineItem.sDirectOnly === 'true') {
      directOnly = '1';
    } else {
      directOnly = '0';
    }
  }
  if (airFareLineItem.sIncCodeshares !== undefined) {
    if (airFareLineItem.sIncCodeshares === true) {
      sIncCodeshares = '1';
    } else {
      sIncCodeshares = '0';
    }
  }

  if (airFareLineItem.ap1 !== undefined && airFareLineItem.ap1 === true) {
    ap1 = '1';
  }
  if (airFareLineItem.ap7 !== undefined && airFareLineItem.ap7 === true) {
    ap7 = '1';
  }
  if (airFareLineItem.ap14 !== undefined && airFareLineItem.ap14 === true) {
    ap14 = '1';
  }
  if (airFareLineItem.ap21 !== undefined && airFareLineItem.ap21 === true) {
    ap21 = '1';
  }
  if (airFareLineItem.ap28 !== undefined && airFareLineItem.ap28 === true) {
    ap28 = '1';
  }
  if (airFareLineItem.ap1s !== undefined && airFareLineItem.ap1s === true) {
    ap1s = '1';
  }
  if (airFareLineItem.ap7s !== undefined && airFareLineItem.ap7s === true) {
    ap7s = '1';
  }
  if (airFareLineItem.ap14s !== undefined && airFareLineItem.ap14s === true) {
    ap14s = '1';
  }
  if (airFareLineItem.ap21s !== undefined && airFareLineItem.ap21s === true) {
    ap21s = '1';
  }
  if (airFareLineItem.ap28s !== undefined && airFareLineItem.ap28s === true) {
    ap28s = '1';
  }

  const data = isCarRental
    ? {
        CarRentalDataInputs: {
          pointOfSale: airFareLineItem.pointOfSale,
          siteCode: airFareLineItem.sites,
          startDate: airFareLineItem.sDateRangeStart,
          endDate: airFareLineItem.sDateRangeEnd,
          pickTime: airFareLineItem.pickTime,
          dropTime: airFareLineItem.dropTime,
          discount: airFareLineItem.discount,
          searchType: airFareLineItem.searchType,
          siteName: '',
          searchName: airFareLineItem.searchName,
          appName: '',
          ref: airFareLineItem.ref,
          custom: airFareLineItem.custom,
          geo: airFareLineItem.geo ? airFareLineItem.geo : '',
          dowFilterDep: airFareLineItem.limitOfWeekPickup,
          dowFilterRet: airFareLineItem.limitOfWeekReturn,
          womFilterDep: airFareLineItem.limitOfMonthPickup,
          womFilterRet: airFareLineItem.limitOfMonthReturn,
          jobId: airFareLineItem.jobId,
          dateRangeLength: airFareLineItem.dateRangeLength,
          address: airFareLineItem.address,
          city: airFareLineItem.city,
          state: airFareLineItem.state,
          postalCode: airFareLineItem.postalCode,
          searchRadius: airFareLineItem.searchRadius,
          RAC: airFareLineItem.RAC,
          country: airFareLineItem.country,
          locationPickup: airFareLineItem.locationPickup,
          locationDropoff: airFareLineItem.locationDropoff,
          locations:
            airFareLineItem.locations ? JSON.stringify({ locations: airFareLineItem.locations }) : undefined,
        },
      }
    : {
        ...{
          AirfareSiteMarketDataInputs: {
            jobId: airFareLineItem.jobId,
            searchName: airFareLineItem.SearchName,
            sMarkets: airFareLineItem.sMarkets,
            specap: specapDt,
            sites: airFareLineItem.sites,
            spcxr: airFareLineItem.spcxr,
            ref: airFareLineItem.ref,
            flc: airFareLineItem.flc,
            pas: airFareLineItem.pas,
            wcn: airFareLineItem.wcn,
            bke: airFareLineItem.bke,
            sDateRangeStart: airFareLineItem.sDateRangeStart,
            sDateRangeEnd: airFareLineItem.sDateRangeEnd,
            sDOWDepart: airFareLineItem.sDOWDepart,
            sDOWReturn: airFareLineItem.sDOWReturn,
            sDirectOnly: directOnly,
            sDepartTime: airFareLineItem.sDepartTime,
            sReturnTime: airFareLineItem.sReturnTime,
            sSearchPOS: airFareLineItem.sSearchPOS,
            sSpecificStops: airFareLineItem.sSpecificStops,
            custom: airFareLineItem.custom,
            geo: airFareLineItem.geo ? airFareLineItem.geo : '',
            dateRangeLength: airFareLineItem.dateRangeLength,
            dateRangeFixedReturn: airFareLineItem.dateRangeFixedReturn,
            sSearchType: airFareLineItem.sSearchType,
            ap1: ap1,
            ap7: ap7,
            ap14: ap14,
            ap21: ap21,
            ap28: ap28,
            ap1s: ap1s,
            ap7s: ap7s,
            ap14s: ap14s,
            ap21s: ap21s,
            ap28s: ap28s,
            sIncCodeshares: sIncCodeshares,
          },
        },
      };
  return axios.post(url, data);
};

const APP_PARAM_URL = '/qs/common/appparam';

export type AppParamResponse = {
  bAllowGeoShopping: boolean;
};

export const getAppParamValues = (vertical: string): Promise<AppParamResponse> => {
  return axios.get(APP_PARAM_URL, {
    params: {
      vertical: vertical,
    },
  });
};
