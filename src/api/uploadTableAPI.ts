import axios from './axiosInstances/privateAxiosInstance';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
const MESSAGE_DURATION = 200;
const API_URL = '/qs/table/tableupload';

export const useUploadTableState = (values: any, setVisible:any, editTableUpdatessss?: any, ) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    let bodyFormData = new FormData();
    bodyFormData.set('uploadId', values && values?.uploadId);
    bodyFormData.set('file', values && values?.file);
    bodyFormData.set('delim', values && values.delim);
    if (values) {
      axios &&
        axios
          .post(API_URL,
          bodyFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }})
          .then((response: any) => {
            if (response.success == true) {
              if (response.success) {
                setTimeout(() => {
                  const redirectUrl = '/settings/tablePage';
                  history.replace(redirectUrl);
                  history.go(0);
                }, MESSAGE_DURATION);
              }
              notification.success({
                message: 'success',
                description: response.message,
                duration: 2,                
              })
              setVisible(false)
            } else {
              notification.error({
                message: response.message,
                description: response.message || 'Something went wrong. Please try again later...',
                duration: 2,
              })
              setVisible(false)
            }
            setLoading(false);            
          })
          .then(() => {
            if (editTableUpdatessss) {
              editTableUpdatessss();
            }})
          .catch(() => {
            setLoading(false);
          });
    }
  }, [values, editTableUpdatessss]);
  return [loading];
};

// reload functions
export const useUploadTableUpdatePostFetch = (values: any, setVisible:any,  onUploadTableUpdate?: any) => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  let bodyFormData = new FormData();
  bodyFormData.set('uploadId', values && values?.uploadId);
  bodyFormData.set('file', values && values?.file);
  bodyFormData.set('delim', values && values.delim);
  useEffect(() => {
    setLoading(true);
    if (values) {     
      axios &&
        axios
          .post(API_URL, 
          bodyFormData,
            {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response: any) => {
            if (response.status == true) {
              setTimeout(() => {
                  const redirectUrl = '/settings/tablePage';
                  history.replace(redirectUrl);
                  history.go(0);
                }, MESSAGE_DURATION);
              notification.success({
                message: 'success',
                description: response.message,
                duration: 2,
              })
              setVisible(false);
            } else {
              notification.error({
                message: response.message,
                description: response.message || 'Something went wrong. Please try again later...',
                duration: 2,
              })}
              setLoading(false);
              setVisible(false);
          })
          .then(() => {
            if (onUploadTableUpdate) {
              onUploadTableUpdate();
            }})
          .catch(() => {
            setLoading(false);
          });
    }
  }, []);
  return [loading];
};