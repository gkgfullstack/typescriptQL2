import React, { useEffect, useState } from 'react';
import ResultsTableView from './ResultsTableView'
import TableResultlistType from 'src/types/TableResultlistType';
import { useApplicationProductResultPageParams } from 'src/api/applicationParams';
import moment from 'moment';
import UserContex from 'src/services/UserContex';
import useQueryUrlParamsDispatch from 'src/hooks/useQueryUrlParamsDispatch';
import AppIdQueryParams from 'src/types/AppIdQueryParams';

type ResultsProps = {
  selectedRowKeyVal?: TableResultlistType[];
};




const Results: React.FC<ResultsProps> = () => {  
  const [{ isResultsView }] = useApplicationProductResultPageParams("-1");

  const defaultDate = UserContex.getDateFormat() !== undefined ? UserContex.getDateFormat() : "mm/dd/yyyy".toUpperCase();
  let defaultDateUppercase = defaultDate;
  let defaultDateConNum = Number(isResultsView);

  let customFormat = (value: any) => `${value.format(defaultDateUppercase)}`;
  let subtractDays: moment.Moment = moment().subtract(defaultDateConNum, "days");
  const setQuery = useQueryUrlParamsDispatch<AppIdQueryParams>();
  const [createdStartDefaultSet, setCreatedStartDefaultSet ] = useState(customFormat(subtractDays));
  useEffect(() => {
    if(defaultDateConNum !== 0){ 
      setCreatedStartDefaultSet(customFormat(subtractDays)) 
    setTimeout(() => {      
      setQuery({ createdStart: customFormat(subtractDays) })
      
    }, 0);
  }

  }, [defaultDateConNum, customFormat(subtractDays)]);
  return (<ResultsTableView fixedDays={createdStartDefaultSet}/>);
};

export default Results;
