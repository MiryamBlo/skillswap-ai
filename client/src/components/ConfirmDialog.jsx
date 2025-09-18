import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

let resolveCallback;

export function ConfirmDialog({ open, title, message, onClose }) {
    const handleClose = (result) => {
        onClose();
        resolveCallback(result);
    };

    return (
        <Dialog open={open} onClose={() => handleClose(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(false)}>Cancel</Button>
                <Button onClick={() => handleClose(true)} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function useConfirm() {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState({});

    const confirm = (title, message) => {
        setOptions({ title, message });
        setOpen(true);
        return new Promise((resolve) => {
            resolveCallback = resolve;
        });
    };

    const handleClose = () => setOpen(false);

    return [confirm, <ConfirmDialog key="confirm" open={open} {...options} onClose={handleClose} />];
}