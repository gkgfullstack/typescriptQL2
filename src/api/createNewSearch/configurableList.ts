import axios from 'src/api/axiosInstances/privateAxiosInstance';
import { useEffect, useState } from 'react';
import auth from 'src/services/auth';
import { useHistory } from 'react-router-dom';
import { message, notification } from 'antd';
import SolutionsData from 'src/types/SolutionsData';

const API_URL = '/qs/searches/customapp';
const CREATE_CONFIGURTABLE_URL = '/qs/searches/addconfiglineitems';
const MESSAGE_DURATION = 200;

const getSiteName = (fields: any) => {
  const siteItem = fields.filter((field: any) => field.fieldType === 'SiteField')[0];
  return siteItem ? siteItem.name : 'site';
};

const transformData = (fields: any) => {
  return fields.filter((field: any) => field.fieldType !== 'SiteField');
};

export const useGetConfigurableList = (appId: string) => {
  const [fields, setFields] = useState([]);
  const [siteName, setSiteName] = useState<string>('site');

  useEffect(() => {
    const userId = auth.getUserId();
    if (appId) {
      axios &&
        axios
          .get(API_URL, {
            headers: {
              userId,
            },
            params: {
              appid: appId,
            },
          })
          .then((response: any) => {
            if (response && response.formfields) {
              setFields(transformData(response.formfields));
              setSiteName(getSiteName(response.formfields));
            }
          })
          .catch((error: any) => {
            console.log(error);
          });
    }
  }, [appId]);

  return [fields, siteName];
};

export const useCreateConfigurableJobSearch = (
  configurableData: SolutionsData[] | undefined,
  jobId: number | undefined
) => {
  const history = useHistory();

  useEffect(() => {
    if (configurableData && jobId) {
      axios &&
        axios
          .post(
            CREATE_CONFIGURTABLE_URL,
            {
              configformInput: configurableData,
            },
            { params: { jobId } }
          )
          .then((response: any) => {
            if (response) {
              if (response.success) {
                message.success(response.message, MESSAGE_DURATION);
                setTimeout(() => {
                  const redirectUrl = '/datascout/search-details/' + jobId;
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
  }, [configurableData, jobId]);

  return [];
};
