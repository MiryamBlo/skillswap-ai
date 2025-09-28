import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';
import SkillsPage from './pages/SkillsPage';
import CategoriesPage from './pages/CategoriesPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import CategoryDetailsPage from './pages/CategoryDetailsPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import HelpSuggestingPage from './pages/HelpSuggestingPage';
import HelpRequestPage from './pages/HelpRequestPage';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';

export default function App() {
  const location = useLocation();
  const { i18n } = useTranslation();
  const [dir, setDir] = useState(i18n.language === 'he' ? 'rtl' : 'ltr');
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    const lang = i18n.language || localStorage.getItem('language') || 'en';
    setDir(lang === 'he' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [i18n.language]);


  return (
    <>
      <div dir={dir}>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
        <Route path="/skills" element={<ProtectedRoute><SkillsPage /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
        <Route path="/opportunities" element={<ProtectedRoute><OpportunitiesPage /></ProtectedRoute>} />
        <Route path="/categories/:id" element={<CategoryDetailsPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/help-suggesting" element={<HelpSuggestingPage />} />
          <Route path="/help-request" element={<HelpRequestPage />} />

        </Routes>
      </div>
    </>
  );
}