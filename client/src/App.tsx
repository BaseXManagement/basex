import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Timesheet from './pages/Timesheet';
import OrderPlacement from './pages/OrderPlacement';
import Delivery from './pages/Delivery';
import SiteManagement from './pages/SiteManagement';
import SiteReports from './pages/SiteReports';
import { useAuthStore } from './stores/authStore';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main: React.FC = () => {
  const location = useLocation();
  const noHeaderRoutes = ['/login', '/register'];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Box
        component="main"
        sx={{
          flex: '1 0 auto',
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/profile/edit" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          <Route path="/timesheet" element={<PrivateRoute><Timesheet /></PrivateRoute>} />
          <Route path="/order-placement" element={<PrivateRoute><OrderPlacement /></PrivateRoute>} />
          <Route path="/delivery" element={<PrivateRoute><Delivery /></PrivateRoute>} />
          <Route path="/site-management" element={<PrivateRoute><SiteManagement /></PrivateRoute>} />
          <Route path="/site-reports" element={<PrivateRoute><SiteReports /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
      {!noHeaderRoutes.includes(location.pathname) && <Footer />}
    </Box>
  );
};

// PrivateRoute component
const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  return user ? children : <Navigate to="/login" />;
};

export default App;
