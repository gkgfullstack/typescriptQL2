type SettingType = {
  TimeZoneList: [{
    label: string;
    value: string;
  }]
  userTimeZone: string;
  emailListParams: [];
  Settings:  [{
    ApplicationName:string;
    Properties:[{
      name: string,
      defaultvalue: string,
      id: string,
      type: string,
      listvaluestr: string,
      helpcompany:string,
			helptitle:string,
			helpcontent:string,
      validation: string,
    }]
  }];
};

export default SettingType;
