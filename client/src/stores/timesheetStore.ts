import { create } from 'zustand';
import { timesheetService, TimesheetData } from '../services/timesheetService';

interface TimesheetState {
  timesheetData?: TimesheetData | null;
  fetchTimesheetData: () => void;
}

export const useTimesheetStore = create<TimesheetState>((set) => ({
  timesheetData: null,
  fetchTimesheetData: async () => {
    const data: TimesheetData = await timesheetService.fetchTimesheetData();
    set({ timesheetData: data });
  },
}));
