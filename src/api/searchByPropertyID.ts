import { useEffect, useState } from 'react';
import axios from 'src/api/axiosInstances/privateAxiosInstance';
import auth from 'src/services/auth';

const API_URL = '/qs/common/help/hotelpropertysearch';

export const useSearchByPropertyID = (locationData: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any>([]);

  useEffect(() => {
    if (locationData) {
      const userId = auth.getUserId();
      setLoading(true);
      axios &&
        axios
          .post(
            API_URL,
            {
              hotelPropertySearchData: locationData,
            },
            {
              headers: {
                userId,
              },
            }
          )
          .then((response: any) => {
            setLoading(false);
            if (response) {
              const result = response.length > 0 ? response : [];
              const propertyData = result.map((child: any) => {
                return {
                  title: child.name,
                  name: child.name,
                  key: child.id,
                  id: child.id,
                  disabled: true,
                  isParent: true,
                };
              });
              setSearchResult(propertyData);
            }
          })
          .catch(error => {
            setLoading(false);
            console.log(error);
          });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationData]);

  return [loading, searchResult];
};
