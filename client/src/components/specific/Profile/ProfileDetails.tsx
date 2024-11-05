import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Card, Tabs, Tab, AppBar, IconButton, Fab, Divider } from '@mui/material';
import { useAuthStore } from '../../../stores/authStore';
import { useProfile } from '../../../hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import EditIcon from '@mui/icons-material/Edit';

export interface JwtPayload {
  user_id: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProfileDetails: React.FC = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  let userId: string | null = null;
  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    userId = decodedToken.user_id;
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const { profile } = useProfile(userId || '');

  if (!userId || !profile) {
    return <div>Loading...</div>;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Card sx={{ marginTop: 8, padding: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {profile.positionRole}
          </Typography>
        </Box>
        <Box>
          <IconButton color="primary" onClick={() => navigate('/profile/edit')}>
            <EditIcon />
          </IconButton>
        </Box>
      </Card>

      <Box sx={{ width: '100%', marginTop: 4 }}>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange} variant="fullWidth">
            <Tab label="Personal Info" />
            <Tab label="Bank Details" />
            <Tab label="Employment Details" />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Personal Information</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>Date of Birth: {new Date(profile.dob).toLocaleDateString()}</Typography>
            <Typography>Address: {profile.address}</Typography>
            <Typography>Phone Number: {profile.phoneNo}</Typography>
            <Typography>Next of Kin Name: {profile.nextOfKinName}</Typography>
            <Typography>Next of Kin Phone Number: {profile.nextOfKinPhoneNr}</Typography>
          </Paper>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Bank Details</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>Bank Name: {profile.bankDetailsBankName}</Typography>
            <Typography>Bank Sort Code: {profile.bankDetailsBankSortCode}</Typography>
            <Typography>Bank Account Number: {profile.bankDetailsAccountNr}</Typography>
            <Typography>UTR Number: {profile.utrNo}</Typography>
          </Paper>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Employment Details</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>Rate: {profile.rate}</Typography>
            <Typography>Position Role: {profile.positionRole}</Typography>
            <Typography>Position Start Date: {new Date(profile.positionStartDate).toLocaleDateString()}</Typography>
          </Paper>
        </TabPanel>
      </Box>

      <Fab color="primary" aria-label="edit" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => navigate('/profile/edit')}>
        <EditIcon />
      </Fab>
    </Container>
  );
};

export default ProfileDetails;
