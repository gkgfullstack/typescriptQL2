type CreateJobPropertiesTypeStopAt = {
    activeType:string;    
    calcType:string;
    label:string;   
     calctypes:{
      job:string;
      wu:string;
    }
    hours:[{
      label:string;
      value:string;
    }]
  };

export default CreateJobPropertiesTypeStopAt;
