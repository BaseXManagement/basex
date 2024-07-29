import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const location = useLocation();
  const titles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/timesheet': 'Timesheet',
    '/order-placement': 'Order Placement',
    '/delivery': 'Delivery',
    '/site-management': 'Site Management',
    '/site-reports': 'Site Reports',
    '/profile': 'Profile',
    '/profile/edit': 'Edit Profile',
  };

  const title = titles[location.pathname] || 'Home';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <TopBar title={title} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
