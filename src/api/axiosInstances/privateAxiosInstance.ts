import axios from 'axios';
import { notification } from 'antd';
import auth from 'src/services/auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.defaults.headers.get['Content-Type'] = 'application/json';
instance.interceptors.request.use(request => {
  const userId = auth.getUserId();
  const token = auth.getToken();
  if (userId && token) {
    request.headers['userId'] = auth.getUserId();
    request.headers['token'] = auth.getToken();
  } else {
    auth.logout();
  }
  return request;
});
instance.interceptors.response.use(
  response => {
    const data = response.data.response || response.data;
    if (response.status === 202) {
      return response;
    }
    if (data && data.errorCode) {
      if (data.errorCode.toString() === '401') {
        auth.logout();
        return Promise.reject('Something went wrong. Please try again later...');
      } else {
        notification.error({
          message: 'An error occurred.',
          description: data.errorMessage || 'Something went wrong. Please try again later...',
          duration: 0,
        });
        return Promise.reject(data.errorMessage);
      }
    }
    return data;
  },
  error => {
    if (error.response && error.response.status && error.response.status === 401) {
      auth.logout();
    } else if (!error.response || (error.response && error.response.status && error.response.status === 500)) {
      //show common notification
      notification.error({
        message: 'Server not responding.',
        description: 'Something went wrong. Please try again later...',
        duration: 0,
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
