import axios from './axiosInstances/privateAxiosInstance';
import AddScheduleType from 'src/types/AddScheduleType';
import Schedule from 'src/types/Schedule';

const API_URL = '/qs/searches/schedule/add';

export type AddScheduleRequest = {
  sSearchIds: string;
};

export type ScheduleResponse2 = {
  success: boolean;
  message: string;
  value: Schedule[];
};

export type ScheduleResponse1 = {
  scheduleList: Schedule[];
};


export const getAddSchedule = (
  addScheduleInputs: AddScheduleType,
): Promise<ScheduleResponse2> => {
  const data = {
    ...({
      ScheduleInputs: {
        addType: addScheduleInputs.addType,
        sSearchIds: addScheduleInputs.sSearchIds,
        months: addScheduleInputs.months,
        year: addScheduleInputs.year,
        days: addScheduleInputs.days,
        hours: addScheduleInputs.hours,
        minute: addScheduleInputs.minute,
        date: addScheduleInputs.date,
      }
    }),
  };
  return axios.post(API_URL, data);
};
