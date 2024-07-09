import React from 'react';
import {notification } from 'antd';

const  MESSAGE_DURATION = 2;
const showNotificationError = (message: string) => {
  const messageItems = message.split('\n').map((item: string, i: number) => {
    if (item) {
      return <li key={`notification-error-${i}`}>{item}</li>;
    }
  });
  notification.error({
    message: 'Please verify all required fields are populated',
    description: message ? (
<ul style={{paddingLeft : 10}}>{messageItems}</ul>
    ) : (
      'Something went wrong. Please try again later...'
    ),
    duration: MESSAGE_DURATION,
  });
};

export default showNotificationError;