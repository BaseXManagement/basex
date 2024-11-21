import React from 'react';
import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { useTimesheet } from '../hooks/useTimesheet';

const Timesheet: React.FC = () => {
  const { timesheetData } = useTimesheet();
  if (!timesheetData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ textAlign: 'center', my: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 2 }}>
        <Button component={Link} to="/timesheet/weekly-report" variant="contained" color="primary">
          Weekly Report
        </Button>
        <Button component={Link} to="/timesheet/payroll-report" variant="contained" color="secondary">
          Payroll Report
        </Button>
      </Box>
      <Outlet context={timesheetData} />
    </Box>
  );
};

export default Timesheet;
