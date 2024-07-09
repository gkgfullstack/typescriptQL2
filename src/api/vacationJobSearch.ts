import { useEffect } from 'react';
import axios from 'src/api/axiosInstances/privateAxiosInstance';
import { message} from 'antd';
import { useHistory } from 'react-router-dom';
import showNotificationError from 'src/components/common/Notification';

const API_URL = '/qs/searches/addlineitemsforvacation';
const MESSAGE_DURATION = 2;

export const useCreateNewLineVacation = (vacationData: any) => {
  const history = useHistory();

  useEffect(() => {
    if (vacationData) {
      const data: any = {
        VacationDataInputs: {
          jobId: vacationData.jobId,
          adults: vacationData.adults,
          children: vacationData.children,
          rooms: vacationData.rooms.toString(),
          searchType: vacationData.searchType,
          siteCode: vacationData.sites,
          geo: vacationData.geo ? vacationData.geo : '',
          origin: vacationData.origin,
          dest: vacationData.destination,
          flightNo: vacationData.flightNumber,
          rentalAgency: vacationData.rentalAgency,
          propertyName: vacationData.propertyName,
          stars: vacationData.stars,
          sortByPrice: vacationData.sortByPrice,
          roomType: vacationData.roomType,
          ref: vacationData.reference,
          custom: vacationData.custom,
          specificDate: vacationData.specificDate,
          dateRangeStart: vacationData.dateRangeStart,
          dateRangeEnd: vacationData.dateRangeEnd,
          dateRangeLength: vacationData.dateRangeLength,
          targetAdd: vacationData.hotelAddress,
          cxr: vacationData.outboundAirline,
          carType: vacationData.carType,
          timeDepart: vacationData.departTime,
          timeReturn: vacationData.returnTime,
          lengthOfStay: vacationData.stayLength,
          maxProps: vacationData.maxPropToFetch,
          maxPropsEachStar: vacationData.maxPropToStarRating,
          boardBasis: vacationData.boardBasis,
          pos: vacationData.pointOfSale,
          ratePerHotel: vacationData.ratesPerHotel,
          dowFilterDep: vacationData.dowFilterDep,
          dowFilterRet: vacationData.dowFilterRet,
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
                  const redirectUrl = '/datascout/search-details/' + vacationData.jobId;
                  history.replace(redirectUrl);
                  history.go(0);
                }, MESSAGE_DURATION);
              } else {
                showNotificationError(response.message);
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vacationData]);

  return [];
};
