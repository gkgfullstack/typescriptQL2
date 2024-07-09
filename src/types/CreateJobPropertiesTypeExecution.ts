type CreateJobPropertiesTypeExecution = {
    activeType:string; 
    label:string;
    types:{
        crawl:{
            delay:{
                nonStop:boolean;
                units:string;
                value:any;
            };
            value:string;
        };
        normal:string;
    };
};

export default CreateJobPropertiesTypeExecution;
