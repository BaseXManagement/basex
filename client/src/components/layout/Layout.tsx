import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { isTokenExpired } from '../../utils/manageToken';

const Layout: React.FC = () => {
  const tokenSession = isTokenExpired(localStorage.getItem("token"));
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
    !tokenSession ? <Box sx={{ display: 'flex', minHeight: '100vh' }}>
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
    </Box> : <Navigate to="/login" />
  );
};

export default Layout;
