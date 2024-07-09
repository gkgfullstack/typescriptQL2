import React from 'react';

import { Switch } from 'antd';

const AdminMode: React.FC<{}> = () => {
  const hasAppAdminModeEnabled: any = window.localStorage.getItem('bAdminMode');

  function onChange(checked: boolean) {
    window.localStorage.setItem('bAdminMode', String(checked));
    window.location.reload();
  }
  return hasAppAdminModeEnabled === 'true' ? (
    <Switch defaultChecked onChange={onChange} size="small" />
  ) : (
    <Switch onChange={onChange} size="small" />
  );
};

export default AdminMode;
