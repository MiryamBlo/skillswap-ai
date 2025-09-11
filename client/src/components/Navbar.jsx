import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    // Hide navbar on login/register pages
    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/users">Users</Link>
                <Link to="/skills">Skills</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/opportunities">Opportunities</Link>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </nav>
    );
}