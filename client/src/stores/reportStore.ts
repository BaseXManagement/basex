import create from 'zustand';
import { reportService } from '../services/reportService';

interface ReportState {
  reports: any[];
  addReport: (report: any) => void;
  fetchReports: () => void;
}

export const useReportStore = create<ReportState>((set) => ({
  reports: [],
  addReport: async (report) => {
    const newReport = await reportService.addReport(report);
    set((state) => ({ reports: [...state.reports, newReport] }));
  },
  fetchReports: async () => {
    const reports = await reportService.getReports();
    set({ reports });
  },
}));
