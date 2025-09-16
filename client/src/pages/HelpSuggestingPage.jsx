import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, TextField, Button, MenuItem } from '@mui/material';
import axiosClient from '../api/axiosClient';

export default function HelpSuggestingPage() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axiosClient.get('/categories').then(res => setCategories(res.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here (e.g., POST to backend)
        alert('Suggestion submitted!');
    };

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f6fa' }}>
            <Card sx={{ minWidth: 400, maxWidth: 500, padding: 4, borderRadius: 4, boxShadow: 6 }}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
                        Suggest How You Can Help
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <TextField
                            select
                            label="Category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            fullWidth
                            required={!newCategory}
                        >
                            {categories.map(cat => (
                                <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>
                            ))}
                            <MenuItem value="">Other (add new)</MenuItem>
                        </TextField>
                        {category === '' && (
                            <TextField
                                label="New Category"
                                value={newCategory}
                                onChange={e => setNewCategory(e.target.value)}
                                fullWidth
                                required
                            />
                        )}
                        <TextField
                            label="Short Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            minRows={3}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" size="large">
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}