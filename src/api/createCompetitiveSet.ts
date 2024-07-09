import axios from './axiosInstances/privateAxiosInstance';
import { useEffect } from 'react';
import { message, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { CompetitiveSet, EditCompetitiveSet, CreateCompetitiveSet } from 'src/types/CompetitiveSet';
import { CompetitiveSetInfo } from 'src/types/CompetitiveSetInfo';

const API_URL = '/qs/compset/createorupdatecompset';
const MESSAGE_DURATION = 1000;

const useCreateCompset = (compSetData: CompetitiveSet | undefined, record: CompetitiveSetInfo | undefined) => {
  const history = useHistory();

  useEffect(() => {
    if (compSetData) {
      const data: EditCompetitiveSet | CreateCompetitiveSet = {
        CompSetDataInputs: {
          compSetId: record ? record.id : undefined,
          compSetName: compSetData.compSetName,
          propertyIDs: compSetData.propertyIDs,
        },
      };

      axios &&
        axios
          .post(API_URL, data)
          .then((response: any) => {
            if (response) {
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
          })
          .catch(error => {
            console.log(error);
          });
    }
  }, [compSetData]);
  return [];
};

export default useCreateCompset;
