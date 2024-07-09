import React, { useState } from 'react';
import { useScheduleList } from '../hooks';
import { Sorting } from 'src/types/Sorting';
import ScheduleView from './ScheduleView';
import Spin from 'src/components/common/Spin';
import { Alert } from 'antd';
import styles from './ScheduleDetails.module.less';
import Schedule from 'src/types/Schedule';
import { useSearchDetailsStateContext } from 'src/stateProviders/useSearchDetailsStateContext';

export const defaultSearchDetailsSorting: Sorting<Schedule> = {
  field: 'description',
  order: 'ascend',
};

export const SHIFT_MATCH_DETAILS_COUNT = 5;

type ScheduleDetailsProps = {};

const ScheduleDetailList: React.FC<ScheduleDetailsProps> = () => {
  let { removeSchedule, deleteds, addScheduleJob, addSched } = useSearchDetailsStateContext();
  if (addSched === true) {
    removeSchedule = addScheduleJob;
    deleteds = true;
  }
  const [sorting, setSorting] = useState(defaultSearchDetailsSorting);
  const [{ data: schedules, loading: matchesLoading, error: matchesError }] = useScheduleList(sorting);

  const loadingMatches: boolean = matchesLoading && schedules === null;

  return (
    <>
      {matchesError && (
        <Alert
          message="Error"
          description="An error
          has occurred when trying to get product match details! Please try again later!"
          type="error"
          showIcon
        />
      )}
      {loadingMatches ? (
        <div className={styles.matches_loader_container}>
          <Spin spinning={loadingMatches} />
        </div>
      ) : null}

      {!deleteds && schedules !== undefined && schedules !== null && schedules.length > 0 ? (
        <ScheduleView
          loading={matchesLoading}
          sorting={sorting}
          items={schedules}
          itemsPerPage={SHIFT_MATCH_DETAILS_COUNT}
          onSortingChange={setSorting}
        />
      ) : (
        <ScheduleView
          loading={matchesLoading}
          sorting={sorting}
          items={removeSchedule}
          itemsPerPage={SHIFT_MATCH_DETAILS_COUNT}
          onSortingChange={setSorting}
        />
      )}
    </>
  );
};

export default ScheduleDetailList;
