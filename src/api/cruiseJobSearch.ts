import { useEffect } from 'react';
import axios from 'src/api/axiosInstances/privateAxiosInstance';
import { message} from 'antd';
import { useHistory } from 'react-router-dom';
import { CruiseJobSearch } from 'src/types/CruiseJobSearch';
import showNotificationError from 'src/components/common/Notification';

const API_URL = '/qs/searches/addlineitemsforcruises';
const MESSAGE_DURATION = 2;

export const useCreateNewLineCruise = (cruiseData: CruiseJobSearch | undefined) => {
  const history = useHistory();

  useEffect(() => {
    if (cruiseData) {
      const data = {
        CruisesDataInputs: {
          ...cruiseData,
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
                  const redirectUrl = '/datascout/search-details/' + cruiseData.jobId;
                  history.replace(redirectUrl);
                  history.go(0);
                }, MESSAGE_DURATION);
              } else  {
                showNotificationError(response.message);
              
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cruiseData]);

  return [];
};
