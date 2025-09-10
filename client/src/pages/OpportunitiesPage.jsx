import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function OpportunitiesPage() {
    const [opps, setOpps] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [orgName, setOrgName] = useState('');

    const fetchOpps = async () => {
        const res = await axiosClient.get('/opportunities');
        setOpps(res.data);
    };

    const addOpp = async (e) => {
        e.preventDefault();
        await axiosClient.post('/opportunities', { title, description, org_name: orgName });
        setTitle('');
        setDescription('');
        setOrgName('');
        fetchOpps();
    };

    useEffect(() => {
        fetchOpps();
    }, []);

    return (
        <div className="page-container">
        <div style={{ padding: '20px' }}>
            <h1>Opportunities</h1>
            <form onSubmit={addOpp}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Organization" />
                <button type="submit">Add Opportunity</button>
            </form>
            <ul>
                {opps.map(o => (
                    <li key={o.id}>{o.title} - {o.org_name}</li>
                ))}
            </ul>
            </div>
        </div>
    );
}