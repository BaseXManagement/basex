import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
    { text: 'Timesheet', icon: <ScheduleIcon />, link: '/timesheet' },
    { text: 'Order Placement', icon: <AssignmentIcon />, link: '/order-placement' },
    { text: 'Delivery', icon: <LocalShippingIcon />, link: '/delivery' },
    { text: 'Site Management', icon: <BusinessIcon />, link: '/site-management' },
    { text: 'Site Reports', icon: <AssessmentIcon />, link: '/site-reports' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: open ? 240 : 60, boxSizing: 'border-box', overflow: "hidden" },
      }}
    >
      <div>
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <List>
        {menuItems.map((item, index) => (
          <Tooltip key={item.text} title={open ? '' : item.text} placement="right">
            <ListItem button component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
