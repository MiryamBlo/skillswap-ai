import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function DashboardPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
                minHeight: '80vh',
                gap: 6,
                width: '100vw',
                maxWidth: '100vw',
                margin: 0,
                padding: 0,
                background: '#f5f6fa',
            }}
        >
            <Card
                sx={{
                    flex: 1,
                    minWidth: 0,
                    margin: 4,
                    borderRadius: 4,
                    boxShadow: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: '#cff1f6ff',
                }}
            >
                <CardActionArea
                    sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => alert('I want to help!')}
                >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <VolunteerActivismIcon sx={{ fontSize: 80, color: '#00bfae', mb: 2 }} />
                        <Typography
                            variant="h3"
                            align="center"
                            fontWeight={700}
                            sx={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive', color: '#00897b' }}
                        >
                            I want to help
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card
                sx={{
                    flex: 1,
                    minWidth: 0,
                    margin: 4,
                    borderRadius: 4,
                    boxShadow: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: '#f8c3e3ff',
                }}
            >
                <CardActionArea
                    sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => alert('I need help!')}
                >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <HelpOutlineIcon sx={{ fontSize: 80, color: '#d81b60', mb: 2 }} />
                        <Typography
                            variant="h3"
                            align="center"
                            fontWeight={700}
                            sx={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive', color: '#ad1457' }}
                        >
                            I need help
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}