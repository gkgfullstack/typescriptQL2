import React from 'react';
import SiteCodeType from 'src/types/SiteCodeType';
import useSiteCodeFetch from './hooks/useSiteCodeFetch';
import Select, { SelectValue } from 'antd/lib/select';
import styles from './SiteCode.module.less';
//import clsx from 'clsx';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Checkbox, Input, Popconfirm, message} from 'antd';
//import { List, Typography } from 'antd';
//import { Radio } from 'antd';
//const { Option } = Select;
type ApplicationSelectionProps = {
  value?: string;
  vertical?:string
  onChange?: (value: SelectValue) => void;
  data?: SiteCodeType[] | null;
  dataSource?: SiteCodeType[] | undefined
};
//const text = 'Are you sure to delete this task?';
const SiteCode: React.FC<ApplicationSelectionProps> = ({ value,vertical }: ApplicationSelectionProps) => {
  const [{ data, loading, error }] = useSiteCodeFetch(vertical==undefined?'102':vertical);
  //const [velues, setValues] = useState();
 
  const _value =
    !loading && !error
      ? value &&
        data &&
        data.some((data: SiteCodeType) => {
          return data.siteCode === value;
        })
        ? value
        : undefined
      : undefined;
      console.log(_value)
      console.log('appId', data)
    //   const text = <Checkbox.Group
    //   className={clsx(styles.owner, { [styles.error]: error })}
    //   onChange={onChange}
    //   //optionLabelProp="label"
    //   //mode="multiple"  
    //   style={{width:'180px',     height: '250px !important',
    //   overflow: 'auto'}}      
    // >
    //   {data &&
    //     data.map(
    //       (sites: SiteCodeType): React.ReactNode => {
    //         return (
    //           <Checkbox  value={sites.siteName}>                  
    //               {sites.siteName} 
    //           </Checkbox >                
    //         );
    //       }
    //     )}
    // </Checkbox.Group>
const { Option } = Select;
const children = [];
children.push(data &&
    data.map(
      (sites: SiteCodeType): React.ReactNode => {
        return (
          <Option  value={sites.siteCode}>                  
              {sites.siteName} 
          </Option >                
        );
      }
    ));


function handleChange(value:any) {
  console.log(`selected ${value}`);
}
  return (
    <div style={{position:'relative'}} className={styles.siteCodeBg}>      
      <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode" onChange={handleChange}>
    {children}
  </Select>   
    </div>
  );
};

export default SiteCode;
