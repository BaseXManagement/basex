const API_URL = 'https://api.example.com'; // Replace with your actual API URL

interface Timesheet {
  id: string;
  date: string;
  hours: number;
}

export const timesheetService = {
  getTimesheets: async (): Promise<Timesheet[]> => {
    const response = await fetch(`${API_URL}/timesheets`);
    if (!response.ok) {
      throw new Error('Failed to fetch timesheets');
    }
    return response.json();
  },
  addTimesheet: async (timesheet: Timesheet): Promise<Timesheet> => {
    const response = await fetch(`${API_URL}/timesheets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(timesheet),
    });
    if (!response.ok) {
      throw new Error('Failed to add timesheet');
    }
    return response.json();
  },
};
