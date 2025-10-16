import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import {
    Container, Typography, TextField, Button, List, ListItem, ListItemText,
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useConfirm } from '../components/ConfirmDialog';
import { useAlert } from '../hooks/useAlert';
import GenericAlert from '../components/GenericAlert';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [name, setName] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const [confirm, confirmDialog] = useConfirm();
    const { alert, showAlert, hideAlert } = useAlert();

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('/categories');
            setCategories(res.data);
            setFiltered(res.data);
        } catch (err) {
            showAlert('Failed to fetch categories', 'error', 'Error');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/categories', { name });
            setName('');
            fetchCategories();
            showAlert('Category added successfully! 🎉', 'success', 'Success');
        } catch {
            showAlert('Failed to add category', 'error', 'Error');
        }
    };

    const handleEditOpen = (cat) => {
        setEditId(cat.id);
        setName(cat.name);
        setOpenEdit(true);
    };

    const handleEditSave = async () => {
        try {
            await axiosClient.put(`/categories/${editId}`, { name });
            setOpenEdit(false);
            setName('');
            fetchCategories();
            showAlert('Category updated successfully! ✅', 'success', 'Success');
        } catch {
            showAlert('Failed to update category', 'error', 'Error');
        }
    };

    const handleSearch = (value) => {
        setSearch(value);
        setFiltered(categories.filter(c =>
            c.name.toLowerCase().includes(value.toLowerCase())
        ));
    };

    const handleDelete = async (id) => {
        const isConfirmed = await confirm('Confirm Deletion', 'Are you sure you want to delete this category?');
        if (!isConfirmed) return;

        try {
            await axiosClient.delete(`/categories/${id}`);
            fetchCategories();
            showAlert('Category deleted successfully! 🗑️', 'success', 'Success');
        } catch {
            showAlert('Failed to delete category', 'error', 'Error');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Container maxWidth="sm" style={{ marginTop: '30px' }}>
            <Typography variant="h4" gutterBottom>Categories</Typography>
            {confirmDialog}

            {/* Add Form */}
            <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <TextField
                    label="Category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">Add</Button>
            </form>

            {/* Search */}
            <TextField
                label="Search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                fullWidth
                style={{ marginBottom: '20px' }}
            />

            {/* List */}
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {filtered.map(cat => (
                        <ListItem
                            key={cat.id}
                            secondaryAction={
                                <>
                                    <IconButton edge="end" onClick={() => handleEditOpen(cat)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="end" onClick={() => handleDelete(cat.id)}>
                                        <Delete />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText primary={cat.name} />
                        </ListItem>
                    ))}
                </List>
            )}

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '10px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                    <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Generic Alert */}
            <GenericAlert alert={alert} onClose={hideAlert} />
        </Container>
    );
}