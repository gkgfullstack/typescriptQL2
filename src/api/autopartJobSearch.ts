import { useEffect } from 'react';
import axios from 'src/api/axiosInstances/privateAxiosInstance';
import { message, notification } from 'antd';
import { useHistory } from 'react-router-dom';

const API_URL = '/qs/searches/addlineitemsforautoparts';
const MESSAGE_DURATION = 200;

export const useCreateAutopartJobSearch = (autopartData: any) => {
  const history = useHistory();

  useEffect(() => {
    if (autopartData) {
      const data: any = {
        AutoPartsDataInputs: {
          jobId: autopartData.jobId,
          siteCode: autopartData.sites,
          year: autopartData.year,
          make: autopartData.make,
          model: autopartData.model,
          engine: autopartData.engine,
          geo: autopartData.geo ? autopartData.geo : '',
          ref: autopartData.reference,
          custom: autopartData.custom,
          categoryPath: autopartData.bookmark || (autopartData.category !== undefined ? autopartData.category : undefined),
          path: autopartData.keyword || autopartData.path,
          region: autopartData.region || autopartData.zipCode,
          manPart: autopartData.manufacturerPartNumber ? autopartData.manufacturerPartNumber : undefined,
          partManufacturer: autopartData.manufacturer ? autopartData.manufacturer : undefined,
          sitePart: autopartData.sitePartNumber ? autopartData.sitePartNumber : undefined,
          type: autopartData.type,
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
                  const redirectUrl = '/datascout/search-details/' + autopartData.jobId;
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
  }, [autopartData]);

  return [];
};
