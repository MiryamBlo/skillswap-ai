import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/login.css'; // Optional: reuse login styles for consistent look

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/auth/register', { name, email, password });
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="page-container">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
            <p style={{ marginTop: '15px', textAlign: 'center' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}