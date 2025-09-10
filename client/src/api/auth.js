import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // לשנות לכתובת השרת שלך בענן

export const registerUser = async (name, email, password) => {
    const res = await axios.post(`${API_URL}/register`, { name, email, password });
    return res.data;
};

export const loginUser = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
};