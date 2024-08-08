import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Tooltip } from '@mui/material';
import { useAuthStore } from '../../stores/authStore';
import { jwtDecode } from 'jwt-decode';
import { useProfile } from '../../hooks/useProfile';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

interface TopBarProps {
  title: string;
}
interface JwtPayload {
  id: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  let userId: string | null = null;
  const {profile} = useProfile(userId || '');

  const getProfile = () => {
    // Decode the token to get the user ID
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      userId = decodedToken.id;
    }
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {title}
        </Typography>
        {token && (
          <div>
            <Tooltip title="Account settings">
              <IconButton onClick={handleMenu} color="inherit">
                <Avatar>
                  {profile?.image ? (
                    <img src={profile.image} alt="profile" style={{ width: '100%' }} />
                  ) : (
                    <PersonIcon />
                  )}
                </Avatar>
                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                  {profile ? profile.firstName : 'User'}
                </Typography>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleProfile}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToAppIcon /> Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
