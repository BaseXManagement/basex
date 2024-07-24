import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" color="textSecondary" align="center">
          © {new Date().getFullYear()} Base-X. All rights reserved.
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Link href="#" variant="body2" sx={{ mx: 1, color: 'inherit' }}>
            Privacy Policy
          </Link>
          <Link href="#" variant="body2" sx={{ mx: 1, color: 'inherit' }}>
            Terms of Service
          </Link>
          <Link href="#" variant="body2" sx={{ mx: 1, color: 'inherit' }}>
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
