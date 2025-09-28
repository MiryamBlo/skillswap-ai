import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import { Button, Box } from '@mui/material';
import ReactCountryFlag from "react-country-flag";
import i18n from '../i18n';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [language, setLanguage] = useState('en');

    // Hide navbar on login/register pages
    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleLanguageChange = () => {
        const newLang = language === 'en' ? 'he' : 'en';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
        i18n.changeLanguage(newLang);
    };

    useEffect(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang) setLanguage(savedLang);
    }, []);

    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
                <Link to="/dashboard">Users</Link>
                <Link to="/skills">Skills</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/opportunities">Opportunities</Link>
                <Link to="/categories/5">Pickup Packages</Link>
                <Link to="/my-opportunities">My Opportunities</Link>
                <Link to="/create-opportunity">Create Opportunity</Link>
                <Link to="/chat">Chat</Link>
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 'auto' }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLanguageChange}
                >
                    {language === 'en' ? (
                        <ReactCountryFlag countryCode="IL" svg style={{ fontSize: '2em' }} />
                    ) : (
                        <ReactCountryFlag countryCode="GB" svg style={{ fontSize: '2em' }} />
                    )}
                </Button>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </nav>
    );
}