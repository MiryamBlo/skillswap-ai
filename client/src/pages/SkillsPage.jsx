import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import '../styles/global.css';

export default function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const fetchSkills = async () => {
        const res = await axiosClient.get('/skills');
        setSkills(res.data);
    };

    const addSkill = async (e) => {
        e.preventDefault();
        await axiosClient.post('/skills', { name, description });
        setName('');
        setDescription('');
        fetchSkills();
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div className="page-container">
            <h1>Skills</h1>
            <form className="skill-form" onSubmit={addSkill} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Skill name"
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <button type="submit">Add Skill</button>
            </form>
            <ul>
                {skills.map(skill => (
                    <li key={skill.id}>
                        <strong>{skill.name}</strong> - <span>{skill.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}