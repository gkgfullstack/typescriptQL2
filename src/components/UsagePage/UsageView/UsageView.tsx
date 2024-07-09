import React, { useState } from 'react';
import styles from './UsageView.module.less';
import { Tabs } from 'antd';
import UsageProgress from './UsageProgress';
import UsageSummary from './UsageSummary';
import SiteSummaryList from './SiteSummaryList';
import SearchSummaryList from './SearchSummaryList';
import RunHistoryList from './RunHistoryList';
import UsageFilter from './UsageFilter';
import UsageDateFilter from './UsageDateFilter';
import { useGetUsageApplication, useGetUsageUsers, useGetUsageSites, useGetUsageJobs } from 'src/api/usageFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/pro-duotone-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useAppStateContext } from 'src/stateProviders/useAppStateContext';
import SKUView from '../SKUView';
import UsageViewHeader from './UsageViewHeader';

const { TabPane } = Tabs;
const faSyncAltPropIcon = faSyncAlt as IconProp;

type UsageViewProps = {};

const UsageView: React.FC<UsageViewProps> = () => {
  const [isReset, setReset] = useState(false);
  const [applicationParam, setApplicationParam] = useState<string>('');
  const [userParam, setUserParam] = useState<string>('');
  const [siteParam, setSiteParam] = useState<string>('');
  const [jobParam, setJobParam] = useState<string>('');
  const [dateParam, setDateParam] = useState<any>(null);
  const [timeZoneParam, setTimeZoneParam] = useState<string>('');
  const [applications] = useGetUsageApplication(dateParam);
  const [users] = useGetUsageUsers(applicationParam, dateParam);
  const [sites] = useGetUsageSites(applicationParam, userParam, dateParam);
  const [jobs] = useGetUsageJobs(applicationParam, userParam, siteParam, dateParam);
  const [period, setPeriod] = useState('Daily');
  const { user } = useAppStateContext();
  const isUsageVisible = user && user.appPermissions['enable_usage'];
  const isInputVisible = !!(user && user.appPermissions['usage_report_org/inputs']);
  const isOutputVisible = !!(user && user.appPermissions['usage_report_org/outputs']);
  const isSKUVisible = !!(user && user.appPermissions['usage_report_org/skus']);
  const [usageType, setUsageType] = useState<string>('input');

  const onPeriodUpdate = (value: string) => {
    setPeriod(value);
  };

  const onUpdateFilter = (name: string, value: string) => {
    if (name === 'Application') {
      setApplicationParam(value);
    }
    if (name === 'User') {
      setUserParam(value);
    }
    if (name === 'Site') {
      setSiteParam(value);
    }
    if (name === 'Job') {
      setJobParam(value);
    }
    if (name === 'date') {
      setApplicationParam('');
      setUserParam('');
      setSiteParam('');
      setJobParam('');
      setDateParam(value);
    }
    if (name === 'timeZone') {
      setTimeZoneParam(value);
    }
  };

  const onUpdateUsage = (value: string) => {
    if (value) {
      setUsageType(value);
    }
  };

  const onReset = () => {
    setReset(true);
  };

  return (
    <>
      <UsageViewHeader
        user={user}
        onUpdateFilter={onUpdateFilter}
        onUpdateUsage={onUpdateUsage}
        isInputVisible={isInputVisible}
        isOutputVisible={isOutputVisible}
        isSKUVisible={isSKUVisible}
      />
      {usageType === 'sku' && <SKUView />}
      {isUsageVisible && usageType !== 'sku' && (
        <div className={styles.usage_progress}>
          <h2>Usage</h2>
          <UsageProgress usageType={usageType} />
        </div>
      )}
      {usageType !== 'sku' && (isInputVisible || isOutputVisible) && (
        <>
          <div className={styles.usage_filters}>
            <UsageFilter name={'Application'} options={applications} onUpdate={onUpdateFilter} isReset={isReset} />
            <UsageFilter name={'User'} options={users} onUpdate={onUpdateFilter} isReset={isReset} />
            <UsageFilter name={'Site'} options={sites} onUpdate={onUpdateFilter} isReset={isReset} />
            <UsageFilter options={jobs} name={'Job'} onUpdate={onUpdateFilter} isReset={isReset} />
            <UsageDateFilter onUpdate={onUpdateFilter} isReset={isReset} setReset={setReset} />
            <FontAwesomeIcon
              title={'Reset Filters'}
              icon={faSyncAltPropIcon}
              className={styles.refresh_icon}
              size={'lg'}
              onClick={onReset}
            />
          </div>
          <UsageSummary
            onUpdate={onPeriodUpdate}
            application={applicationParam}
            date={dateParam}
            usageType={usageType}
            user={userParam}
            site={siteParam}
            job={jobParam}
            timeZone={timeZoneParam}
          />
          <Tabs className={styles.usage_tabs} type="card">
            <TabPane tab={`${period.charAt(0).toUpperCase() + period.slice(1)} Summary`} key="history">
              <RunHistoryList
                application={applicationParam}
                user={userParam}
                site={siteParam}
                job={jobParam}
                date={dateParam}
                period={period}
                usageType={usageType}
                timeZone={timeZoneParam}
              />
            </TabPane>
            <TabPane tab={'Site Summary'} key="summary">
              <SiteSummaryList
                application={applicationParam}
                user={userParam}
                site={siteParam}
                job={jobParam}
                date={dateParam}
                usageType={usageType}
                timeZone={timeZoneParam}
              />
            </TabPane>
            <TabPane tab={'Job Summary'} key="search">
              <SearchSummaryList
                application={applicationParam}
                user={userParam}
                site={siteParam}
                job={jobParam}
                date={dateParam}
                usageType={usageType}
                timeZone={timeZoneParam}
              />
            </TabPane>
          </Tabs>
        </>
      )}
    </>
  );
};

export default UsageView;
