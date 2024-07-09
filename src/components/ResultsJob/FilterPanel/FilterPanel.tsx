import React from 'react';
import SearchBar from './SearchBar';
//import styles from './FilterPanel.module.less';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import AppIdQueryParams from 'src/types/AppIdQueryParams';
import useQueryUrlParams from 'src/hooks/useQueryUrlParams';
import useDateFilter from 'src/hooks/useDateFilter';
import ApplicationSelection from './ApplicationSelection/ApplicationSelection';
import { SelectValue } from 'antd/lib/select';
import useAppId from 'src/hooks/useAppId';
import { Button } from 'antd';
import DateFilter from './DateFilter';
//import { DateFilterFormProps } from './DateFilter/DateFilterForm/DateFilterForm';
import DateFilterQueryParams from 'src/types/DateFilterQueryParams'

type SearchPanelProps = {
  pathname?: string;
  ownerPathname?: string;
  appId?: string | null;
  search?: any;
  values?:string | null;
  createdStart?:string | null;
  createdEnd?:string | null;
  lastrunStart?:string | null;
  lastrunEnd?:string | null;
  finishedStart?:string | null;
  finishedEnd?:string | null;
  updatedStart?:string | null;
  updatedEnd?:string | null;
  isPageType?:string | null;
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
}: SearchPanelProps) => {
  const appId = useAppId();
  const createdStart  = useDateFilter();
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
    isPageType 
    ;
    const handleOwnerChange = (value: SelectValue) => {
    localStorage.removeItem('appId');
    const sourceOwnerIds = value.toString();
    localStorage.setItem('appId', sourceOwnerIds);
    setQuery(
      {
        appId: value.toString(),
        isPageType:isPageType,
        //appIds: [],
      },
      ownerPathname || pathname,
      true
    );
  };
  const handleSearchChange = (value: string): void => {
    setQuery(
      {
        //appId: ownerValue,
        isPageType:isPageType,
        search: value,
        
      },
      pathname
    );
  };
  const handlerSearchEvent = (values: DateFilterQueryParams): void => {
    setQuery(
      {
        //appId: ownerValue,
        createdStart: values.createdStart,
        createdEnd: values.createdEnd,
        lastrunStart: values.lastrunStart,
        lastrunEnd: values.lastrunEnd,
        finishedStart: values.finishedStart,
        finishedEnd: values.finishedEnd,
        updatedStart: values.updatedStart,
        updatedEnd: values.updatedEnd,
        isPageType:isPageType,
      },
      pathname
    );
  };

  return (
    <div className="search_panel_wrapper">
      <div className="search_panel_owner">
        <Button type="primary" style={{ marginRight: '10px', width: '100%' }}>New Search</Button>
      </div>

      <div className="search_panel_input">
        <SearchBar onChangeSearch={handleSearchChange} value={search} />
      </div>
      <div className="search_panel_owner" style={{ marginLeft: '10px' }}>
        <ApplicationSelection value={ownerValue} onChange={handleOwnerChange} />
      </div>
      <div className="search_panel_owner">
        <DateFilter 
        values={createdStart}
         onSubmit={handlerSearchEvent}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
