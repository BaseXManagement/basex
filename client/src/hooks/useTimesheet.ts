import { useEffect } from 'react';
import { useTimesheetStore } from '../stores/timesheetStore';

export const useTimesheet = () => {
  const { timesheetData, fetchTimesheetData, saveTimesheetData } = useTimesheetStore((state) => ({
    timesheetData: state.timesheetData,
    fetchTimesheetData: state.fetchTimesheetData,
    saveTimesheetData: state.saveTimesheetData,
  }));

  useEffect(() => {
    fetchTimesheetData();
  }, [fetchTimesheetData]);

  return { timesheetData, saveTimesheetData };
};
