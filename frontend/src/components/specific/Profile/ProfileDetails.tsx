import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button, Avatar } from '@mui/material';
import { useProfile } from '../../../hooks/useProfile';
import { useAuthStore } from '../../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const ProfileDetails: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const { profile } = useProfile(user.id);
  const navigate = useNavigate();

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ width: 100, height: 100, bgcolor: 'secondary.main', mb: 2 }}>
          {profile.firstName[0]}{profile.lastName[0]}
        </Avatar>
        <Typography component="h1" variant="h5">
          {profile.firstName} {profile.lastName}
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Personal Information</Typography>
                <Typography>Date of Birth: {new Date(profile.dob).toLocaleDateString()}</Typography>
                <Typography>Address: {profile.address}</Typography>
                <Typography>Phone Number: {profile.phoneNo}</Typography>
                <Typography>Next of Kin Name: {profile.nextOfKinName}</Typography>
                <Typography>Next of Kin Phone Number: {profile.nextOfKinPhoneNr}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Bank Details</Typography>
                <Typography>Bank Name: {profile.bankDetailsBankName}</Typography>
                <Typography>Bank Sort Code: {profile.bankDetailsBankSortCode}</Typography>
                <Typography>Bank Account Number: {profile.bankDetailsAccountNr}</Typography>
                <Typography>UTR Number: {profile.utrNo}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Employment Details</Typography>
                <Typography>Rate: {profile.rate}</Typography>
                <Typography>Position Role: {profile.positionRole}</Typography>
                <Typography>Position Start Date: {new Date(profile.positionStartDate).toLocaleDateString()}</Typography>
              </Paper>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/profile/edit')}
            >
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileDetails;
