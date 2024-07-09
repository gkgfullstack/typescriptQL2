import AppPermissions from './AppPermissions';

type UserInfo = {
  userId: string;
  userName: string;
  appPermissions: AppPermissions;
  isAdminMode?: boolean;
};

export default UserInfo;
