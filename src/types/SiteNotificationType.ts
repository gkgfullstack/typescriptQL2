//import ApplicationFilterType from "./ApplicationFilterType";

type SiteNotificationType = {
    notifyEmail: string;
    optInMode: string;
    siteList:  [{
        name: string,
        scriptId: string,
        scriptChecked: boolean,
        scriptStatus: boolean,
        scriptDeactivateDate: string,
        scriptDeactivateReason:string
    }];
    vertical:[{
        ID:any,
        name:any,
        values:boolean,
    }]
};

export default SiteNotificationType;
