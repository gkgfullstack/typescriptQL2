import { useEffect } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import { CyberPrice } from 'src/types/CyberPrice';
import { message, notification } from 'antd';
import { useHistory } from 'react-router-dom';

const API_URL = '/qs/searches/addlineitemsforcyberprice';
const MESSAGE_DURATION = 2;

const useCreateCyberPrice = (cyberPrice: CyberPrice | undefined) => {
  const history = useHistory();

  useEffect(() => {
    if (cyberPrice) {
      const data = {
        CyberPriceDataInputs: { ...cyberPrice },
      };
      axios &&
        axios
          .post(API_URL, data)
          .then((response: any) => {
            if (response) {
              if (response.success) {
                message.success(response.message, MESSAGE_DURATION);
                setTimeout(() => {
                  const redirectUrl = '/datascout/search-details/' + cyberPrice.jobId;
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
  }, [cyberPrice]);
  return [];
};

export default useCreateCyberPrice;
