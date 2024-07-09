type CreateJobPropertiesTypeApp = {
    id:number;
    name:string;
    default: string;
    details:any;
    value:string;
    type:any;
    pname:string;
    pval:string;
    tables:[{
      label:string;
      value:string;
    }];
    activeTable:string;
  };  

export default CreateJobPropertiesTypeApp;
