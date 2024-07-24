import React from 'react';
import ProfileForm from '../components/specific/Profile/ProfileForm';
import { Container, Typography, Box, CssBaseline } from '@mui/material';

const EditProfile: React.FC = () => {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <ProfileForm />
      </Box>
    </Container>
  );
};

export default EditProfile;
