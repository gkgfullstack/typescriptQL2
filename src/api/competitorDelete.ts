import { useEffect, useState } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import auth from 'src//services/auth';
import { message, notification } from 'antd';
import { useHistory } from 'react-router-dom';

const API_URL = '/qs/compset/deletecompset';
const MESSAGE_DURATION = 1000;

export type CompetitiveDeleteRequest = {
  compSetId:number;
};

export const useCompetitorDelete = (params: CompetitiveDeleteRequest | null) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [competitiveDelete, setCompetitiveDelete] = useState<any>([]);

  useEffect(() => {
    if (params) {
      const userId = auth.getUserId();
      setLoading(true);
      axios &&
        axios
          .get(API_URL, {
            params: {
              compSetId:params
            },
            headers: {
              userId,
            },
          })
          .then((response: any) => {          
            if (response) {
              setCompetitiveDelete(response);
              if (response.status === 'success') {
                message.success(response.description, MESSAGE_DURATION);
                setTimeout(() => {
                  history.go(0);
                }, MESSAGE_DURATION);
              } else {
                notification.error({
                  message: response.description,
                  duration: MESSAGE_DURATION,
                });
              }
            }
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
    }
  }, [params]);

  return [loading, competitiveDelete];
};

