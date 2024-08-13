import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Button, Card, Tabs, Tab, AppBar, IconButton, Fab, Divider } from '@mui/material';
import { useAuthStore } from '../../../stores/authStore';
import { useProfile } from '../../../hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import EditIcon from '@mui/icons-material/Edit';

interface JwtPayload {
  id: string;
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
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  // Decode the token to get the user ID
  let userId: string | null = null;
  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    userId = decodedToken.id;
  }

  // Redirect to login if there's no token
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Always call useProfile, pass a default value if userId is null
  const { profile } = useProfile(userId || '');

  // Handle the case where the profile is still loading or not found
  if (!userId || !profile) {
    return <div>Loading...</div>;
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="lg">
      {/* Profile Summary */}
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

      {/* Tabbed Sections */}
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

      {/* Floating Edit Button */}
      <Fab color="primary" aria-label="edit" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => navigate('/profile/edit')}>
        <EditIcon />
      </Fab>
    </Container>
  );
};

export default ProfileDetails;
