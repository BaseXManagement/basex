import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
        <Button color="inherit" component={Link} to="/timesheet">Timesheet</Button>
        <Button color="inherit" component={Link} to="/order-placement">Order Placement</Button>
        <Button color="inherit" component={Link} to="/delivery">Delivery</Button>
        <Button color="inherit" component={Link} to="/site-management">Site Management</Button>
        <Button color="inherit" component={Link} to="/site-reports">Site Reports</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
