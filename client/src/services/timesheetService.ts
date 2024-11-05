// import { authService } from './authService';

// const JAVA_API = process.env.REACT_APP_JAVA_API;

// export interface TimesheetData {
//   weeklyData: any[];
//   userInfo: {
//     weekEnding: string;
//     belongTo: string;
//     notes?: string;
//   };
//   payrollData: {
//     invoiceNumber: string;
//     date: string;
//     name: string;
//     address: string;
//     bankAccount: string;
//     sortCode: string;
//     utrNumber: string;
//     weeks: Array<{
//       weekEnding: string;
//       jobs: Array<{ jobName: string; amount: number }>;
//     }>;
//     subTotal: number;
//     tax: number;
//     total: number;
//   };
// }

// const getAuthHeaders = () => {
//   const token = authService.getToken();
//   return {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   };
// };

// export const timesheetService = {
//   fetchTimesheetData: async (): Promise<TimesheetData> => {
//     const response = await fetch(`${JAVA_API}/timesheet`, {
//       method: 'GET',
//       headers: getAuthHeaders(),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch timesheet data');
//     }
//     return response.json();
//   },
// };

export interface TimesheetData {
  weeklyData: any[];
  userInfo: {
    weekEnding: string;
    belongTo: string;
    notes?: string;
  };
  payrollData: {
    invoiceNumber: number;
    date: string;
    name: string;
    address: string;
    bankAccount: string;
    sortCode: string;
    utrNumber: string;
    weeks: Array<{
      weekEnding: string;
      jobs: Array<{ jobName: string; amount: number }>;
    }>;
    subTotal: number;
    tax: number;
    total: number;
  };
}

// Mock data for testing
const mockPayrollData = {
  invoiceNumber: 7,
  date: "23-Dec-2021",
  name: "Alan McAllister",
  address: "2 Woodford Road, WD171PA",
  bankAccount: "13297344",
  sortCode: "08-71-99",
  utrNumber: "22378482781",
  weeks: [
    {
      weekEnding: "20/12/2020",
      jobs: [
        { jobName: "Lazari", amount: 170 },
        { jobName: "Henrietta House", amount: 170 },
        { jobName: "Henrietta House", amount: 170 },
        { jobName: "O2 Arena", amount: 170 },
        { jobName: "Wembley Hospital", amount: 170 },
      ],
    },
    {
      weekEnding: "27/12/2020",
      jobs: [
        { jobName: "Wembley Hospital", amount: 170 },
        { jobName: "Wembley Hospital", amount: 170 },
        { jobName: "Henrietta House", amount: 170 },
        { jobName: "Henrietta House", amount: 170 },
        { jobName: "Henrietta House", amount: 170 },
        { jobName: "Henrietta House", amount: 255 },
        { jobName: "Henrietta House", amount: 255 },
      ],
    },
  ],
  subTotal: 2210,
  tax: 442,
  total: 1768,
};
const mockUserInfo = {
  weekEnding: "28-Jul-24",
  belongTo: "Mike Brown",
  notes: "",
};
const mockWeeklyData = [
  {
    day: "Monday",
    jobName: "Alvarez & Marshal",
    timeIn: "8:00",
    timeOut: "16:00",
    hours: 8,
    overtimeHrs: null,
    totalHours: 8,
    amount: "",
    typeA: "",
    typeB: "",
    totalAmount: 200,
  },
  {
    day: "Tuesday",
    jobName: "Alvarez & Marshal",
    timeIn: "8:00",
    timeOut: "16:00",
    hours: 8,
    overtimeHrs: null,
    totalHours: 8,
    amount: "",
    typeA: "",
    typeB: "",
    totalAmount: 200,
  },
  {
    day: "Wednesday",
    jobName: "Alvarez & Marshal",
    timeIn: "8:00",
    timeOut: "16:00",
    hours: 8,
    overtimeHrs: null,
    totalHours: 8,
    amount: "",
    typeA: "",
    typeB: "",
    totalAmount: 200,
  },
  {
    day: "Thursday",
    jobName: "Alvarez & Marshal",
    timeIn: "8:00",
    timeOut: "16:00",
    hours: 8,
    overtimeHrs: null,
    totalHours: 8,
    amount: "",
    typeA: "",
    typeB: "",
    totalAmount: 200,
  },
  {
    day: "Friday",
    jobName: "Alvarez & Marshal",
    timeIn: "8:00",
    timeOut: "16:00",
    hours: 8,
    overtimeHrs: null,
    totalHours: 8,
    amount: "",
    typeA: "",
    typeB: "",
    totalAmount: 200,
  },
  {
    day: "Saturday",
    jobName: "Alvarez & Marshal",
    timeIn: "8:00",
    timeOut: "16:00",
    hours: 8,
    overtimeHrs: 3,
    totalHours: 13.5,
    amount: "",
    typeA: "",
    typeB: "",
    totalAmount: 300,
  },
  {
    day: "Sunday",
    jobName: "Alvarez & Marshal",
    timeIn: "8:00",
    timeOut: "16:00",
    hours: 8,
    overtimeHrs: 3,
    totalHours: 13.5,
    amount: "",
    typeA: "",
    typeB: "",
    totalAmount: 300,
  },
];

export const timesheetService = {
  fetchTimesheetData: async (): Promise<TimesheetData> => {
    // Instead of making an API call, return mock data
    return {
      weeklyData: mockWeeklyData,
      userInfo: mockUserInfo,
      payrollData: mockPayrollData, 
    };
  },
};
