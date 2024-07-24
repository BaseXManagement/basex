const API_URL = 'https://api.example.com'; // Replace with your actual API URL

interface Site {
  id: string;
  name: string;
  location: string;
}

export const siteService = {
  getSites: async (): Promise<Site[]> => {
    const response = await fetch(`${API_URL}/sites`);
    if (!response.ok) {
      throw new Error('Failed to fetch sites');
    }
    return response.json();
  },
  addSite: async (site: Site): Promise<Site> => {
    const response = await fetch(`${API_URL}/sites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(site),
    });
    if (!response.ok) {
      throw new Error('Failed to add site');
    }
    return response.json();
  },
};
