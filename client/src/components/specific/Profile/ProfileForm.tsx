import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, Divider, Avatar, IconButton } from '@mui/material';
import { useProfileStore } from '../../../stores/profileStore';
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface Field {
  name: string;
  label: string;
  type: string;
}

const formatProfileDates = (data: any) => {
  return {
    ...data,
    dob: data.dob ? data.dob.split('T')[0] : '',
    positionStartDate: data.positionStartDate ? data.positionStartDate.split('T')[0] : '',
  };
};

const ProfileForm: React.FC = () => {
  const { profile, updateProfile } = useProfileStore((state) => ({
    profile: state.profile,
    updateProfile: state.updateProfile,
  }));
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => formatProfileDates(profile || {}));

  useEffect(() => {
    setFormData(formatProfileDates(profile || {}));
  }, [profile]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateProfile(formData);
    navigate('/profile');
  };

  const personalDetailsFields: Field[] = [
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'phoneNo', label: 'Phone Number', type: 'number' },
  ];

  const nextOfKinFields: Field[] = [
    { name: 'nextOfKinName', label: 'Next of Kin Name', type: 'text' },
    { name: 'nextOfKinPhoneNr', label: 'Next of Kin Phone Number', type: 'number' },
  ];

  const bankDetailsFields: Field[] = [
    { name: 'bankDetailsBankName', label: 'Bank Name', type: 'text' },
    { name: 'bankDetailsBankSortCode', label: 'Bank Sort Code', type: 'text' },
    { name: 'bankDetailsAccountNr', label: 'Bank Account Number', type: 'number' },
    { name: 'utrNo', label: 'UTR Number', type: 'number' },
  ];

  const positionDetailsFields: Field[] = [
    { name: 'rate', label: 'Rate', type: 'number' },
    { name: 'positionRole', label: 'Position Role', type: 'text' },
    { name: 'positionStartDate', label: 'Position Start Date', type: 'date' },
  ];

  const renderFields = (fields: Field[]) => (
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
  );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Button variant="outlined" onClick={() => navigate('/profile')}>
            Back
          </Button>
        </Grid>
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{ width: 100, height: 100, mr: -2 }}
              src={formData.image || ''}
            />
            <label htmlFor="profile-image-upload" style={{marginTop: "5em", marginLeft:"-0.5em"}}>
              <input
                accept="image/*"
                id="profile-image-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>Personal Details</Typography>
      {renderFields(personalDetailsFields)}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>Next of Kin Details</Typography>
      {renderFields(nextOfKinFields)}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>Bank Details</Typography>
      {renderFields(bankDetailsFields)}

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>Position Details</Typography>
      {renderFields(positionDetailsFields)}

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
