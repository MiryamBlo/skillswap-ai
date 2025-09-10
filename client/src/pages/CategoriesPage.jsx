import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const fetchCategories = async () => {
        const res = await axiosClient.get('/categories');
        setCategories(res.data);
    };

    const addCategory = async (e) => {
        e.preventDefault();
        await axiosClient.post('/categories', { name, description });
        setName('');
        setDescription('');
        fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="page-container">
            <h1>Categories</h1>
            <form onSubmit={addCategory}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Category name"
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <button type="submit">Add Category</button>
            </form>
            <ul>
                {categories.map(cat => (
                    <li key={cat.id}>
                        <strong>{cat.name}</strong> - <span>{cat.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}