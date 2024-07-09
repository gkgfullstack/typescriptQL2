type EditTablePageSetting = {
    tableId: File;
    name?:string; 
    desc?: string; 
    columns?:string;
    sharedEdit?:string;
    visibility?:string;
};

export default EditTablePageSetting;