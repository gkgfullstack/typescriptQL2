import { notification } from 'antd';
import { useEffect, useState } from 'react';
import axios from './axiosInstances/privateAxiosInstance';
import { useHistory } from 'react-router-dom';

export const useSaveAsAccAPIPost = (values: any, setVisibleSaveAsAcc:any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (values) {
      setLoading(true);
      axios &&
        axios
          .get(`/qs/searches/searchsaveasacc?searchId=${values.id}&newName=${values.name}`, {
          })
          .then((response: any) => {
            if (response.success ===  true) {
              notification.success({
                message: 'Job saved as successfully. Job id:' + '<' + response.value +'>',
                description: response.message,
                duration: 2,
              })
              setTimeout(() => {
                const redirectUrl = '/datascout/search-details/' + response.value ;
                history.replace(redirectUrl);
              },2000);
              setVisibleSaveAsAcc(false)
            } else {
              notification.error({
                message: response.message,
                description: response.message || 'Something went wrong. Please try again later...',
                duration: 2,
              },
              )}            
          })                            
          .catch(e => console.log(e));
    }
  }, [values]);

  return [loading];
};
