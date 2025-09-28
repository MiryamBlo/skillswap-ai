import React, { useEffect, useState } from 'react';
import {
    Card, CardContent, Typography, Box, TextField, Button,
    MenuItem, Slider, Checkbox, FormControlLabel, Snackbar, Alert
} from '@mui/material';
import axiosClient from '../api/axiosClient';
import StarsIcon from '@mui/icons-material/Stars';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useTranslation } from 'react-i18next';

export default function HelpSuggestingPage() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [distance, setDistance] = useState(10);
    const [creditCost, setCreditCost] = useState(1);
    const [isFree, setIsFree] = useState(false);
    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' | 'error' | 'warning' | 'info'
    const [displayDurationDays, setDisplayDurationDays] = useState(1);
    const { t } = useTranslation();

    useEffect(() => {
        axiosClient.get('/categories').then(res => setCategories(res.data));
    }, []);
    const userId = localStorage.getItem('userId'); // or from context/store
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/help-suggestions', {
                category,
                newCategory,
                title,
                description,
                distance,
                creditCost: isFree ? 0 : creditCost,
                isFree,
                userId,
                displayDurationDays
            });
            
            setSnackbarMessage('Thanks for offering your help!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            
            setCategory('');
            setNewCategory('');
            setTitle('');
            setDescription('');
            setDistance(10);
            setCreditCost(1);
            setIsFree(false);
            if (newCategory) {
                // Refresh categories if a new one was added
                const res = await axiosClient.get('/categories');
                setCategories(res.data);
            }
        }
       catch (err) {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.error &&
                    err.response.data.error.includes('duplicate key value violates unique constraint "categories_name_key"')
                ) {
                    setSnackbarMessage('This category already exists.');
                    setSnackbarSeverity('error');
                } else {
                    setSnackbarMessage('Failed to submit offering.');
                    setSnackbarSeverity('error');
                }
                setSnackbarOpen(true);
            }
    };

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f6fa' }}>
            <Card sx={{ minWidth: 400, maxWidth: 500, padding: 4, borderRadius: 4, boxShadow: 6 }}>
                <CardContent>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        fontWeight={700}
                        sx={{ color: '#00897b', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}
                    >
                        <VolunteerActivismIcon sx={{ fontSize: 48, color: '#00bfae', mb: 1 }} />
                        { t('HowToHelp')}?
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <TextField
                            select
                            label={t('Category')}
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            fullWidth
                            required={!newCategory}
                        >
                            {categories.map(cat => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                            <MenuItem value="Other">{t('Other')} ({t('newCategory')})</MenuItem>
                        </TextField>
                        {category === 'Other' && (
                            <TextField
                                label={t('newCategory')}
                                value={newCategory}
                                onChange={e => setNewCategory(e.target.value)}
                                fullWidth
                                required
                            />
                        )}
                        <TextField
                            label={t('ShortDescription')}
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label={t('Description')}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            minRows={3}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isFree}
                                    onChange={e => setIsFree(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label={t('free')}
                        />
                        <Box sx={{ px: 2 }}>
                            <Typography gutterBottom>
                               {t('DisplayDuration')}: {displayDurationDays}
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
                        {!isFree && (
                            <Box sx={{ px: 2 }}>
                                <Box sx={{ px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <StarsIcon sx={{ color: '#f8c3e3ff', fontSize: 32 }} />
                                    <Typography gutterBottom fontWeight={600}>
                                        {t('CreditCost')}: {creditCost}
                                    </Typography>
                                </Box>
                                <Slider
                                    value={creditCost}
                                    onChange={(e, val) => setCreditCost(val)}
                                    min={1}
                                    max={10}
                                    step={1}
                                    valueLabelDisplay="auto"
                                />
                            </Box>
                        )}
                        <Box sx={{ px: 2 }}>
                            <Typography gutterBottom>{t('DistanceRange')}: {distance}</Typography>
                            <Slider
                                value={distance}
                                onChange={(e, val) => setDistance(val)}
                                min={1}
                                max={50}
                                step={1}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary" size="large">
                            {t('Submit')}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            {/* Snackbar Notification */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}