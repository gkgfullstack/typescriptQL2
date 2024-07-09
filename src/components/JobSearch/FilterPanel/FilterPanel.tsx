import React from 'react';
import SearchBar from './SearchBar';
import styles from './FilterPanel.module.less';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import AppIdQueryParams from 'src/types/AppIdQueryParams';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useDateFilter from 'src/hooks/useDateFilter';
import ApplicationSelection from './ApplicationSelection/ApplicationSelection';
import { SelectValue } from 'antd/lib/select';
import useAppId from 'src/hooks/useAppId';
import DateFilter from './DateFilter';
import DateFilterQueryParams from 'src/types/DateFilterQueryParams';
import CreateNewSearch from 'src/components/CreateNewSearch';

type SearchPanelProps = {
  pathname?: string;
  ownerPathname?: string;
  appId?: string | null;
  search?: any;
  values?: string | null;
  createdStart?: string | null;
  createdEnd?: string | null;
  lastrunStart?: string | null;
  lastrunEnd?: string | null;
  finishedStart?: string | null;
  finishedEnd?: string | null;
  updatedStart?: string | null;
  updatedEnd?: string | null;
  isPageType?: string | null;
  ownerName?: string | null;
};

const FilterPanel: React.FC<SearchPanelProps> = ({
  pathname,
  ownerPathname,
  appId: sourceOwnerIdProp,
  search: searchPropsid,
  createdStart: dateSearchId1,
  createdEnd: dateSearchId2,
  lastrunStart: dateSearchId3,
  lastrunEnd: dateSearchId4,
  finishedStart: dateSearchId5,
  finishedEnd: dateSearchId6,
  updatedStart: dateSearchId7,
  updatedEnd: dateSearchId8,
  isPageType,
  ownerName: ownerName,
}: SearchPanelProps) => {
  const appId = useAppId();
  const createdStart = useDateFilter();
  const { search = '' } = useQueryUrlParams<AppIdQueryParams>();
  const setQuery = useQueryUrlParamsDispatch<AppIdQueryParams>();
  const ownerValue =
    sourceOwnerIdProp ||
    appId ||
    searchPropsid ||
    dateSearchId1 ||
    dateSearchId2 ||
    dateSearchId3 ||
    dateSearchId4 ||
    dateSearchId5 ||
    dateSearchId6 ||
    dateSearchId7 ||
    dateSearchId8 ||
    isPageType ||
    ownerName;
  const handleOwnerChange = (value: SelectValue) => {
    localStorage.removeItem('appId');
    const sourceOwnerIds = value.toString();
    localStorage.setItem('appId', sourceOwnerIds);
    setQuery(
      {
        appId: value.toString(),
        isPageType: isPageType,
      },
      ownerPathname || pathname,
      true
    );
  };
  const handleSearchChange = (value: string): void => {
    setQuery(
      {
        isPageType: isPageType,
        search: value,
      },
      pathname
    );
  };
  const handlerSearchEvent = (values: DateFilterQueryParams): void => {
    setQuery(
      {
        createdStart: values.createdStart,
        createdEnd: values.createdEnd,
        lastrunStart: values.lastrunStart,
        lastrunEnd: values.lastrunEnd,
        finishedStart: values.finishedStart,
        finishedEnd: values.finishedEnd,
        updatedStart: values.updatedStart,
        updatedEnd: values.updatedEnd,
        isPageType: isPageType,
        ownerName: values.ownerName,
      },
      pathname
    );
  };
  const onSubmit = () => {};
  return (
    <div className={styles.search_panel_wrapper}>
      <div className={styles.search_panel_owner}>
        <CreateNewSearch onSubmit={onSubmit} />
      </div>

      <div className={styles.search_panel_input}>
        <SearchBar onChangeSearch={handleSearchChange} value={search} />
      </div>
      <div className={styles.search_panel_owner} style={{ marginLeft: '10px' }}>
        <ApplicationSelection value={ownerValue} onChange={handleOwnerChange} />
      </div>
      <div className={styles.search_panel_owner}>
        <DateFilter values={createdStart} onSubmit={handlerSearchEvent} />
      </div>
    </div>
  );
};

export default FilterPanel;
