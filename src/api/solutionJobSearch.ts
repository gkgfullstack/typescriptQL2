import { useEffect } from 'react';
import axios from 'src/api/axiosInstances/privateAxiosInstance';
import { message, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { SolutionJobSearch } from 'src/types/SolutionJobSearch';

const API_URL = '';
const MESSAGE_DURATION = 2;

export const useCreateNewLineSolution = (solutionData: SolutionJobSearch | undefined) => {
  const history = useHistory();

  useEffect(() => {
    if (solutionData) {
      axios &&
        axios
          .post(API_URL, solutionData)
          .then((response: any) => {
            if (response) {
              if (response.success) {
                message.success(response.message, MESSAGE_DURATION);
                setTimeout(() => {
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
  }, [solutionData]);

  return [];
};
