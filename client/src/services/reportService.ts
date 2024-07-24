const API_URL = 'https://api.example.com'; // Replace with your actual API URL

interface Report {
  id: string;
  date: string;
  content: string;
  // Add other fields as needed
}

export const reportService = {
  getReports: async (): Promise<Report[]> => {
    const response = await fetch(`${API_URL}/reports`);
    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }
    return response.json();
  },
  addReport: async (report: Report): Promise<Report> => {
    const response = await fetch(`${API_URL}/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });
    if (!response.ok) {
      throw new Error('Failed to add report');
    }
    return response.json();
  },
};
