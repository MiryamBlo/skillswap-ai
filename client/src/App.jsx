import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';
import SkillsPage from './pages/SkillsPage';
import CategoriesPage from './pages/CategoriesPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
        <Route path="/skills" element={<ProtectedRoute><SkillsPage /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
        <Route path="/opportunities" element={<ProtectedRoute><OpportunitiesPage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}