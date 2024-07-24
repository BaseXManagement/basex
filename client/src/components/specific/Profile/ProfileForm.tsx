import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useProfileStore } from '../../../stores/profileStore';
import { useNavigate } from 'react-router-dom';

const ProfileForm: React.FC = () => {
  const { profile, updateProfile } = useProfileStore((state) => ({
    profile: state.profile,
    updateProfile: state.updateProfile,
  }));
  const navigate = useNavigate();

  const [formData, setFormData] = useState(profile || {});

  useEffect(() => {
    setFormData(profile || {});
  }, [profile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile(formData);
    navigate('/profile');
  };

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'phoneNo', label: 'Phone Number', type: 'number' },
    { name: 'nextOfKinName', label: 'Next of Kin Name', type: 'text' },
    { name: 'nextOfKinPhoneNr', label: 'Next of Kin Phone Number', type: 'number' },
    { name: 'bankDetailsBankName', label: 'Bank Name', type: 'text' },
    { name: 'bankDetailsBankSortCode', label: 'Bank Sort Code', type: 'text' },
    { name: 'bankDetailsAccountNr', label: 'Bank Account Number', type: 'number' },
    { name: 'utrNo', label: 'UTR Number', type: 'number' },
    { name: 'rate', label: 'Rate', type: 'number' },
    { name: 'positionRole', label: 'Position Role', type: 'text' },
    { name: 'positionStartDate', label: 'Position Start Date', type: 'date' },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <TextField
              margin="normal"
              required
              fullWidth
              id={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save
      </Button>
    </Box>
  );
};

export default ProfileForm;
