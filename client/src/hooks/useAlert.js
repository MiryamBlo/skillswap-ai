import { useState } from 'react';

export const useAlert = () => {
    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success' | 'error' | 'warning' | 'info'
        title: ''
    });

    const showAlert = (message, severity = 'success', title = '') => {
        setAlert({
            open: true,
            message,
            severity,
            title
        });
    };

    const hideAlert = () => {
        setAlert(prev => ({ ...prev, open: false }));
    };

    return {
        alert,
        showAlert,
        hideAlert
    };
};