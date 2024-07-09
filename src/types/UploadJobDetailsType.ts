//import TablePageEditTableType from "./TablePageEditTableType";

type UploadJobDetailsType = {
  columns: {    
    id: string;
    helpId: string;
    description: string;
    name: string;
  };
  numberOfColumns: number;
  delimeter:string;
};

export default UploadJobDetailsType;
