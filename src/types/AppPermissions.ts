import AppPermissionName from './AppPermissionName';
type AppPermissions = {
  [k in AppPermissionName]: boolean;
};

export default AppPermissions;
