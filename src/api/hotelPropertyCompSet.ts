import axios from 'src/api/axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';

const API_URL = '/qs/account/user/findcompsetproperty';

export const useGetHotelPropertyCompSet = () => {
  const [compSet, setCompSet] = useState<any[]>([]);

  useEffect(() => {
    axios &&
      axios
        .get(API_URL)
        .then((response: any) => {
          if (response) {
            setCompSet(
              response.map((item: any) => {
                return { id: item.properties, name: item.name };
              })
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
  }, []);
  return [compSet];
};
