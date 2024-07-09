import { useEffect } from 'react';
import axios from 'src/api/axiosInstances/privateAxiosInstance';
import { message, notification } from 'antd';
import { useHistory } from 'react-router-dom';

const API_URL = '/qs/searches/addlineitemsforhotel';
const MESSAGE_DURATION = 200;

export const useCreateHotelJobSearch = (hotelData: any) => {
  const history = useHistory();

  useEffect(() => {
    if (hotelData) {
      const data: any = {
        HotelDataInputs: {
          ...hotelData,
          siteCode: hotelData.sites,
          maxResults: hotelData.maximumProperties,
          location: hotelData.location || hotelData.airportCode,
          occ: hotelData.occupancy,
          dowFilterIn: hotelData.limitOfWeek,
          dowFilterOut: hotelData.limitOfMonth,
          lengthOfStay: hotelData.dateRangeLength,
          compSetNames: hotelData.compSet,
          geo: hotelData.geo ? hotelData.geo : '',
          compSet: undefined,
          dateRangeLength: undefined,
          limitOfMonth: undefined,
          limitOfWeek: undefined,
          occupancy: undefined,
          maximumProperties: undefined,
          sites: undefined,
          airportCode: undefined,
        },
      };
      axios &&
        axios
          .post(API_URL, data)
          .then((response: any) => {
            if (response) {
              if (response.success) {
                message.success(response.message, MESSAGE_DURATION);
                setTimeout(() => {
                  const redirectUrl = '/datascout/search-details/' + hotelData.jobId;
                  history.replace(redirectUrl);
                  history.go(0);
                }, MESSAGE_DURATION);
              } else {
                notification.error({
                  message: response.message,
                  duration: MESSAGE_DURATION,
                });
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelData]);

  return [];
};
