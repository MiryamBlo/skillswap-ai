import React, { useEffect, useState } from 'react';
import {
    Card, CardContent, Typography, Box, TextField, Button,
    MenuItem, Slider, Checkbox, FormControlLabel
} from '@mui/material';
import axiosClient from '../api/axiosClient';
import StarsIcon from '@mui/icons-material/Stars';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../hooks/useAlert';
import GenericAlert from '../components/GenericAlert';

export default function HelpSuggestingPage() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [distance, setDistance] = useState(10);
    const [creditCost, setCreditCost] = useState(1);
    const [isFree, setIsFree] = useState(false);
    const [displayDurationDays, setDisplayDurationDays] = useState(1);

    const { t, i18n } = useTranslation();
    const { alert, showAlert, hideAlert } = useAlert();

    useEffect(() => {
        axiosClient.get('/categories').then(res => setCategories(res.data));
    }, []);

    const userId = localStorage.getItem('userId');
    const lang = i18n.language || localStorage.getItem('language') || 'en';
    const dir = lang === 'he' ? 'rtl' : 'ltr';

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

            showAlert('Thanks for offering your help! 🎉', 'success', 'Success');

            // Clear form
            setCategory('');
            setNewCategory('');
            setTitle('');
            setDescription('');
            setDistance(10);
            setCreditCost(1);
            setIsFree(false);
            setDisplayDurationDays(1);

            if (newCategory) {
                const res = await axiosClient.get('/categories');
                setCategories(res.data);
            }
        } catch (err) {
            if (
                err.response &&
                err.response.data &&
                err.response.data.error &&
                err.response.data.error.includes('duplicate key value violates unique constraint "categories_name_key"')
            ) {
                showAlert('This category already exists.', 'error', 'Error');
            } else {
                showAlert('Failed to submit offering. Please try again.', 'error', 'Error');
            }
        }
    };

    return (
        <Box dir={dir} sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f6fa' }}>
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
                        {t('HowToHelp') || 'How can you help'}?
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

                        <Box sx={{ px: 2 }}>
                            <Typography gutterBottom>
                                {t('DistanceRange') || 'Distance range (km)'}: {distance}
                            </Typography>
                            <Slider
                                value={distance}
                                onChange={(e, val) => setDistance(val)}
                                min={1}
                                max={50}
                                step={1}
                                valueLabelDisplay="auto"
                            />
                        </Box>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isFree}
                                    onChange={e => setIsFree(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label={t('free') || 'Offer for free'}
                            sx={{ alignSelf: 'flex-start' }}
                        />

                        {!isFree && (
                            <Box sx={{ px: 2 }}>
                                <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <StarsIcon sx={{ color: '#ffc107' }} />
                                    {t('CreditCost') || 'Credit cost'}: {creditCost}
                                </Typography>
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

                        <Button type="submit" variant="contained" color="primary" size="large">
                            {t('Submit') || 'Submit'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Generic Alert */}
            <GenericAlert alert={alert} onClose={hideAlert} />
        </Box>
    );
}