import { create } from 'zustand';
import { timesheetService, TimesheetData } from '../services/timesheetService';

interface TimesheetState {
  timesheetData?: TimesheetData | null;
  fetchTimesheetData: () => void;
  saveTimesheetData: (updatedWeeklyData: any[]) => Promise<void>;
}

export const useTimesheetStore = create<TimesheetState>((set) => ({
  timesheetData: null,

  fetchTimesheetData: async () => {
    const data: TimesheetData = await timesheetService.fetchTimesheetData();
    set({ timesheetData: data });
  },

  saveTimesheetData: async (updatedWeeklyData: any[]) => {
    await timesheetService.saveTimesheetData(updatedWeeklyData);
    set((state) => ({
      timesheetData: state.timesheetData
        ? { ...state.timesheetData, weeklyData: updatedWeeklyData }
        : null,
    }));
  },
}));
