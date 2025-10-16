import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, TextField, Button, MenuItem, Slider } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import axiosClient from '../api/axiosClient';
import { useTranslation } from 'react-i18next';
import '../i18n';

export default function HelpRequestPage() {
    const { t, i18n } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [displayDurationDays, setDisplayDurationDays] = useState(1);

    useEffect(() => {
        axiosClient.get('/categories').then(res => setCategories(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosClient.post('/help-requests', {
                category,
                newCategory,
                title,
                description,
                displayDurationDays,
                userId: localStorage.getItem('userId')
            });
            if (res.data.suggestions && res.data.suggestions.length > 0) {
                // Show suggestions to the user
                // For example, setSuggestions(res.data.suggestions);
                alert('Found relevant help offers!');
            } else {
                alert(t('request_submitted') || 'Request submitted!');
                setCategory('');
                setNewCategory('');
                setTitle('');
                setDescription('');
                setDisplayDurationDays(1);
            }
        } catch (err) {
            alert(t('request_failed') || 'Failed to submit request.');
        }
    };

    const lang = i18n.language || localStorage.getItem('language') || 'en';
    const dir = lang === 'he' ? 'rtl' : 'ltr';

    return (
        <Box dir={dir} sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f6fa' }}>
            <Card sx={{ minWidth: 400, maxWidth: 500, padding: 4, borderRadius: 4, boxShadow: 6 }}>
                <CardContent>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        fontWeight={700}
                        sx={{ color: '#ad1457', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}
                    >
                        <HelpOutlineIcon sx={{ fontSize: 48, color: '#d81b60', mb: 1 }} />
                        {t('HowCanWeHelpYou')}?
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <TextField
                            select
                            label={t('Category') || 'Category'}
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            fullWidth
                            required={!newCategory}
                        >
                            {categories.map(cat => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                            <MenuItem value="Other">{t('Other') || 'Other'} ({t('newCategory') || 'Add new'})</MenuItem>
                        </TextField>
                        {category === 'Other' && (
                            <TextField
                                label={t('newCategory') || 'New Category'}
                                value={newCategory}
                                onChange={e => setNewCategory(e.target.value)}
                                fullWidth
                                required
                            />
                        )}
                        <TextField
                            label={t('ShortDescription') || 'Short Title'}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label={t('Description') || 'Description'}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            minRows={3}
                        />
                        <Box sx={{ px: 2 }}>
                            <Typography gutterBottom>
                                {t('DisplayDuration') || 'Display Duration (days)'}: {displayDurationDays}
                            </Typography>
                            <Slider
                                value={displayDurationDays}
                                onChange={(e, val) => setDisplayDurationDays(val)}
                                min={1}
                                max={30}
                                step={1}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary" size="large">
                            {t('Submit') || 'Submit'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}