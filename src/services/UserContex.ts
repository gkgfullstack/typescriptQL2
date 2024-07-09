const UserContex = () => {
  let _timeZone = '';
  let _dateFormat:any ='';
  let _baseUrl:any ='';
  return {
    
    setTimeZone: (timeZone: string) => {
      _timeZone=timeZone;
      window.localStorage.setItem("_timeZone", timeZone); 
    },
    getTimeZone: () => {        
      return window.localStorage.getItem("_timeZone") !== null ? window.localStorage.getItem("_timeZone") : _timeZone;
    },
   
    setDateFormat: (dateformat: string) => {
      _dateFormat = dateformat;
      window.localStorage.setItem("_dateFormat", dateformat); 
    },  
    getDateFormat: () => {
      return  window.localStorage.getItem("_dateFormat") !== undefined ? window.localStorage.getItem("_dateFormat") : _dateFormat;
    },   
    setBaseUrl: (baseUrl: string) => {
      _baseUrl = baseUrl;
      window.localStorage.setItem("_baseUrl", baseUrl); 
    },      
    getBaseUrl: () => {
      return window.localStorage.getItem("_baseUrl") !== undefined ? window.localStorage.getItem("_baseUrl") : _baseUrl;
    }, 
  };
};

export default UserContex();
