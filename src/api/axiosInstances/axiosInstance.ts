import axios from 'axios';
import { notification } from 'antd';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.defaults.headers.get['Content-Type'] = 'application/json';

instance.interceptors.response.use(
  response => response.data,
  error => {
    if (!error.response || (error.response && error.response.status && error.response.status === 500)) {
      //show common notification
      notification.error({
        message: 'Server not responding',
        description: 'Something went wrong. Please try again later...',
        duration: 0,
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
