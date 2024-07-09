import React, { useEffect, useState } from 'react';
import styles from './SiteList.module.less';
import { Checkbox, Popover } from 'antd';
import { faExclamationTriangle } from 'src/setupIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spin from 'src/components/common/Spin';
import { getSiteNotificationAPI } from 'src/api/siteNotifications';

const CheckboxGroup = Checkbox.Group;

export type SiteListProps = {
  application: string;
  dataList: boolean;
  onUpdate: any;
  keyId: any;
  disabled: boolean;
  setCheckedValues: any;
  setCheckedValuesAllList: any;
  map: Map<string, object>;
  setCheckedValuesAgin: any;
  setIndeterminateDefault: any;
};

const SiteList: React.FC<SiteListProps> = (props): React.ReactElement => {
  const { application, dataList, setCheckedValues, disabled, setCheckedValuesAllList, map, setCheckedValuesAgin, setIndeterminateDefault } = props;
  const [siteNotificationsData, setSiteNotificationsData] = useState([]);
  const [siteNotificationsDataDefault, setSiteNotificationsDataDefault] = useState([]);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (application && dataList) {
      const fetch = async () => {
        setLoading(true);
        try {
          const response: any = await getSiteNotificationAPI(application);
          const siteListInitial = response
            ? (response.siteList || []).map((type: any) => ({
              name: type.name,
              scriptId: type.scriptId,
              scriptChecked: type.scriptChecked,
              scriptStatus: type.scriptStatus,
              whoChanged : type.whoChanged,
              scriptDeactivateDate: type.scriptDeactivateDate,
              scriptDeactivateReason: type.scriptDeactivateReason,
            }))
            : [];
          setSiteNotificationsData(siteListInitial);
          let siteListFirstDataGet = siteListInitial && siteListInitial.filter(function (typess: any) {
            return typess.scriptChecked === true;
        }).map(function (typess: any) {
            return typess.scriptId;
        })
        if(siteListFirstDataGet.length > 0){
          map.set(application, siteListFirstDataGet);
        }
        if(siteListFirstDataGet.length > 0){
        setSiteNotificationsDataDefault(siteListFirstDataGet)
        }
        setIndeterminate(siteListFirstDataGet.length > 0 ? true : false)        
        setLoading(false);
        } catch (e) {
          console.log(e);
          setLoading(false);
        }
      };
      fetch();
    }
  }, [application, dataList]);
  const errorMassage: any = siteNotificationsData;
  const errorMassage2 = errorMassage?.length === 0 ? 'No Site Enabled' : null;

  const checkedValuesDefault = siteNotificationsData && (siteNotificationsData || []).map((type: any) => (type.scriptId));
  const plainOptions = checkedValuesDefault.filter(e => e);
  
  const arryLength:any = siteNotificationsDataDefault.length; 
  
  const [checkedList, setCheckedList] = useState<any>(siteNotificationsDataDefault); 
  useEffect(() => {
    if (arryLength > 0) {
      setCheckedList(siteNotificationsDataDefault)
    }
  }, [arryLength])
  const selectedData = (checkedValues: any) => {    
    setCheckedValuesAgin(checkedValues);
    setCheckedList(checkedValues);
    setCheckAll(checkedValues.length === plainOptions.length);
    setIndeterminate(!!checkedValues.length && checkedValues.length < plainOptions.length);
    setIndeterminateDefault(indeterminate);
    map.set(application, checkedValues)
  }

  const onCheckAllChange = (e: any) => {
    setCheckedValuesAllList(e.target.checked);
    setCheckAll(e.target.checked);
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setIndeterminateDefault(indeterminate);
    map.set(application, e.target.checked ? plainOptions : []);
  };

  useEffect(() => {
    setCheckedValues(map)    
  }, [dataList, application, checkAll, checkedList, setCheckedList])


  return (
    <div className={styles.run_history_list_table_wrapper}>
      <Checkbox onChange={onCheckAllChange} indeterminate={indeterminate} checked={checkAll} disabled={disabled} />
      {loading && <Spin spinning={loading} />}
      {!loading && (
        <CheckboxGroup onChange={selectedData} value={checkedList} disabled={disabled}>
          {application.length > 0 && application && siteNotificationsData.length > 0 &&
            siteNotificationsData.map((checkbox: any) => (
              <Checkbox key={checkbox.scriptId} value={checkbox.scriptId}>
                {checkbox.name}
                {checkbox.scriptDeactivateDate !== '' ? (
                  <Popover
                    content={
                      <div>
                        Deactivated on {checkbox.scriptDeactivateDate}
                        <br />
                        by {checkbox.whoChanged} : {checkbox.scriptDeactivateReason}                        
                      </div>
                    }
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                  </Popover>
                ) : ('')}
              </Checkbox>
            ))}
          <p>{errorMassage2}</p>
        </CheckboxGroup>
      )}
    </div>
  );
};

export default SiteList;
