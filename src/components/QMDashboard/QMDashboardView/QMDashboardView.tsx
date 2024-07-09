import React from 'react';
import PriceDistributionGraph from '../PriceDistributionGraph';
import { Popover, Button, Tooltip} from 'antd';
import SearchPanel from '../../ProductFinder/SearchPanel';
import CompetitorPriceAnalysis from '../CompetitorPriceAnalysis';
import routes from 'src/routes';
import CategoryPriceAnalysis from '../CategoryPriceAnalysis';
import { usePriceVarianceFetch } from './hooks';
import useSourceOwnerId from 'src/hooks/useSourceOwnerId';
import { Tabs } from 'antd';
import styles from '../CompetitorPriceAnalysis/CompetitorPriceAnalysis.module.less';
import CategoryVariancess from '../CategoryVariancess';
import Widget from 'src/components/common/Widget';
import CompetitorVariancess from '../CompetitorVariancess';
import { usePriceCollectedTimeFetch } from './hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChangePasswordForm from 'src/components/SettingsPage/ChangePassword/ChangePasswordForm';
import { useChangePasswordPostFetch } from 'src/components/SettingsPage/hooks';
import Modal from 'src/components/common/Modal';
import clsx from 'clsx';
import OptionsFiltersSider from 'src/components/ProductFinder/OptionsFiltersSider';
import { useSearchProductsStateContext } from 'src/stateProviders/useSearchProductsStateContext';
const { TabPane } = Tabs;
type QMDashboardViewProps = {};

const QMDashboardView: React.FC<QMDashboardViewProps> = () => {
  const [{ data: priceVariance, loading }] = usePriceVarianceFetch();
  const [{ data: priceCollectedTime }] = usePriceCollectedTimeFetch();
  const sourceOwnerId = useSourceOwnerId();
    const content = (
    <div>
      <p>Collection Date: {priceCollectedTime && ( priceCollectedTime.priceCollectedTimestamp)}</p>
    </div>
  );
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsedOptions, setCollapsedOptions] = React.useState(true);
  const [ openClose, setOpenClose]  = React.useState(true);
  const openCloseFunction = () => {  
    if(openClose=== true){
      setOpenClose(false)
      setCollapsedOptions(false);
      setCollapsed(true);
    }else{
      setOpenClose(true)
      setCollapsedOptions(true);
    }
   
  }
  
  const { advancedFilters } = useSearchProductsStateContext();
  const isOpen = advancedFilters && advancedFilters.isOpen;
localStorage.setItem('sourceOwnerId', `${sourceOwnerId}`);
  const forgetPassword = localStorage.getItem("changePasswordFlag")
  const [{ data, error }, { updateChangePassword }]: any = useChangePasswordPostFetch();
  console.log(data, error)
  let forgetPasswordCondition = false;
  if (forgetPassword === 'null') {
    forgetPasswordCondition = false;
  } else if (forgetPassword === 'true') {
    forgetPasswordCondition = true;
  } else {
    forgetPasswordCondition = false;
  };
  const [passwordChanged, setPasswordChanged] = React.useState<any>(forgetPasswordCondition)
  const addUpdateNameSetting = (values: any): void => {
    if (updateChangePassword && values) {
      updateChangePassword(values);
      setPasswordChanged(false);
    }
  };
  return (<>
  <div className={styles.searchBardetailsPage}>
      <div
        className={clsx(styles.search_panel, { 
          [styles.without_filters]: !collapsedOptions || !collapsed,
          [styles.with_filters]: collapsedOptions || collapsed
        })}
      >
        <SearchPanel pathname={routes.productFinder} ownerPathname={routes.qmatchDashboard} />
        </div>
        <div className={clsx(styles.openClose, { 
          [styles.without_filters]: !collapsedOptions || !collapsed,
          [styles.with_filters]: collapsedOptions || collapsed
        })}>
       {collapsedOptions ?
      <Button block={collapsedOptions} type="primary" onClick={openCloseFunction}><span>{collapsedOptions ? <FontAwesomeIcon icon={['far', 'chevron-right']} size={'lg'} /> : <FontAwesomeIcon icon={['far', 'sliders-h']} size={'lg'} /> }<span>Options</span></span></Button>
      :  <Tooltip placement="topLeft" title="Options"><Button block={collapsedOptions} type="primary" onClick={openCloseFunction} ><span>{collapsedOptions ? <FontAwesomeIcon icon={['far', 'chevron-right']} size={'lg'} /> : <FontAwesomeIcon icon={['far', 'sliders-h']} size={'lg'} /> }<span>Options</span></span></Button></Tooltip>}
      </div>
      </div>
      <div className={styles.mainConteners}>    
      <div className={clsx(styles.product_list_container, { [styles.with_filters]: isOpen })}>
        <PriceDistributionGraph content = 
        {priceCollectedTime !== null && priceCollectedTime.priceCollectedTimestamp !=null ? ("Collection Date: "+priceCollectedTime.priceCollectedTimestamp):""}  />   
      
      <Widget title={'Competitor Price'}>
	  <Popover placement="left" content={content} >
    <Button type="link" style= {{position:"absolute", zIndex:9,right:0, marginTop:"-45px"}} >
      <FontAwesomeIcon icon={['fal', 'info-circle']} />
    </Button>
    </Popover>
      <Tabs tabPosition="top" className={styles.tabs}>
        <TabPane tab="Distribution" key="1">
        <CompetitorPriceAnalysis priceVariance={priceVariance} loading={loading} />
     </TabPane>
        <TabPane tab="Variance" key="2">       
        <CompetitorVariancess variancess={priceVariance} loading={loading} />
        </TabPane>
      </Tabs>
      </Widget>
    
      <Widget title={'Category Analysis'}>
	  <Popover placement="left" content={content} >
    <Button type="link" style= {{position:"absolute", zIndex:9,right:0, marginTop:"-45px"}} ><FontAwesomeIcon icon={['fal', 'info-circle']} /></Button>
    </Popover>
      <Tabs tabPosition="top" className={styles.tabs}>
       <TabPane tab="Distribution" key="1">
       <CategoryPriceAnalysis priceVariance={priceVariance} loading={loading} />
     </TabPane>
        <TabPane tab="Variance" key="2">
          <CategoryVariancess variancess={priceVariance} loading={loading} />
        </TabPane>
      </Tabs>
      </Widget>
      </div>
      {openClose ? <OptionsFiltersSider className={styles.optionssLeft} collapsedOptions={collapsedOptions}/> : null}
      </div>
      <Modal 
        title="Change Password"
        visible={passwordChanged}
        footer={null}
        className={styles.changePasswordPopOver}
        closable={false}
      >
        <ChangePasswordForm onUpdate={addUpdateNameSetting} />
      </Modal>
  </>);
};
export default QMDashboardView;
