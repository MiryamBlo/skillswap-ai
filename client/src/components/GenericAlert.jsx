import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Alert } from '@mui/material';

export default function GenericAlert({ alert, onClose }) {
    useEffect(() => {
        if (alert.open) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alert.open, onClose]);

    return (
        <Dialog
            open={alert.open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            {alert.title && (
                <DialogTitle sx={{ pb: 1 }}>
                    {alert.title}
                </DialogTitle>
            )}
            <DialogContent sx={{ pt: alert.title ? 1 : 2 }}>
                <Alert
                    severity={alert.severity}
                    sx={{
                        fontSize: '1.2rem',
                        '& .MuiAlert-message': {
                            fontSize: '1.2rem',
                            fontWeight: 500
                        }
                    }}
                >
                    {alert.message}
                </Alert>
            </DialogContent>
        </Dialog>
    );
}