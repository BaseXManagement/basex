import create from 'zustand';
import { timesheetService } from '../services/timesheetService';

interface TimesheetState {
  timesheets: any[];
  addTimesheet: (timesheet: any) => void;
  fetchTimesheets: () => void;
}

export const useTimesheetStore = create<TimesheetState>((set) => ({
  timesheets: [],
  addTimesheet: async (timesheet) => {
    const newTimesheet = await timesheetService.addTimesheet(timesheet);
    set((state) => ({ timesheets: [...state.timesheets, newTimesheet] }));
  },
  fetchTimesheets: async () => {
    const timesheets = await timesheetService.getTimesheets();
    set({ timesheets });
  },
}));
