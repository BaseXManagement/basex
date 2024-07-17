import create from 'zustand';
import { siteService } from '../services/siteManagementService';

interface SiteManagementState {
  sites: any[];
  addSite: (site: any) => void;
  fetchSites: () => void;
}

export const useSiteManagementStore = create<SiteManagementState>((set) => ({
  sites: [],
  addSite: async (site) => {
    const newSite = await siteService.addSite(site);
    set((state) => ({ sites: [...state.sites, newSite] }));
  },
  fetchSites: async () => {
    const sites = await siteService.getSites();
    set({ sites });
  },
}));
