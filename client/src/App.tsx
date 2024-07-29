import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Timesheet from './pages/Timesheet';
import OrderPlacement from './pages/OrderPlacement';
import Delivery from './pages/Delivery';
import SiteManagement from './pages/SiteManagement';
import SiteReports from './pages/SiteReports';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/timesheet" element={<Timesheet />} />
          <Route path="/order-placement" element={<OrderPlacement />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/site-management" element={<SiteManagement />} />
          <Route path="/site-reports" element={<SiteReports />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const PrivateRoute: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default App;
