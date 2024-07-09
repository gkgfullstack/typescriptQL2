import { useEffect } from 'react';
import axios from 'src/api/axiosInstances/privateAxiosInstance';
import { message} from 'antd';
import { useHistory } from 'react-router-dom';
import { FerryJobSearch } from 'src/types/FerryJobSearch';
import showNotificationError from 'src/components/common/Notification';

const API_URL = '/qs/searches/addlineitemsforferry';
const MESSAGE_DURATION = 2;

export const useCreateNewLineFerry = (ferryData: FerryJobSearch | undefined) => {
  const history = useHistory();

  useEffect(() => {
    if (ferryData) {
      axios &&
        axios
          .post(API_URL, { FerryDataInputs: ferryData })
          .then((response: any) => {
            if (response) {
              if (response.success) {
                message.success(response.message, MESSAGE_DURATION);
                setTimeout(() => {
                  const redirectUrl = '/datascout/search-details/' + ferryData.jobId;
                  history.replace(redirectUrl);
                  history.go(0);
                }, MESSAGE_DURATION);
              } else {
                showNotificationError(response.message);
                return;
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ferryData]);

  return [];
};
