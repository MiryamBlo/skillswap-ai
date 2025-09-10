import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function UsersPage() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await axiosClient.get('/users');
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Users</h1>
            <ul>
                {users.map(u => (
                    <li key={u.id}>{u.name} - {u.email}</li>
                ))}
            </ul>
        </div>
    );
}