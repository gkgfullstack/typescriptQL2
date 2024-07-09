export const TOKEN_KEY = '_TOKEN';
export const SKIN_NAME = '_SKIN';

const auth = () => {
  let _userId = '';
  return {
    getSkin: () => {
      return window.localStorage.getItem(SKIN_NAME);
    },
    setSkin: (skin: string) => {
      window.localStorage.setItem(SKIN_NAME, skin);      
    },
    getToken: () => {
      return window.localStorage.getItem(TOKEN_KEY);
    },
    setToken: (token: string) => {
      window.localStorage.setItem(TOKEN_KEY, token);      
    },
    getUserId: () => {
      return _userId;
    },
    setUserId: (userId: string) => {
      _userId = userId;
    },
     cleanup: () => {
      _userId = '';
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem("bAdminMode");
      localStorage.removeItem('appId');
    },
    logout: () => {
      _userId = '';
      window.localStorage.removeItem(SKIN_NAME);
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem("bAdminMode");
      localStorage.removeItem('appId');
      //window.location.replace(`${process.env.REACT_APP_CC_APP_DOMAIN}/login.jsp`);
	  window.location.replace(`${process.env.REACT_APP_CC_APP_DOMAIN}/d/home/logout/`);
    },
  };
};

export default auth();
