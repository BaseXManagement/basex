import { useEffect } from 'react';
import { useTimesheetStore } from '../stores/timesheetStore';

export const useTimesheet = () => {
  const { timesheetData, fetchTimesheetData } = useTimesheetStore((state) => ({
    timesheetData: state.timesheetData,
    fetchTimesheetData: state.fetchTimesheetData,
  }));

  useEffect(() => {
    fetchTimesheetData();
  }, [fetchTimesheetData]);

  return { timesheetData };
};
