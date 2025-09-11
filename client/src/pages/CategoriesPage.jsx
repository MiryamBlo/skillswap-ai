import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import {
  Container, Typography, TextField, Button, List, ListItem, ListItemText,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/categories');
      setCategories(res.data);
      setFiltered(res.data);
    } catch (err) {
      showSnackbar('Failed to fetch categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/categories', { name, description });
      setName('');
      setDescription('');
      fetchCategories();
      showSnackbar('Category added successfully');
    } catch {
      showSnackbar('Failed to add category', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      await axiosClient.delete(`/categories/${id}`);
      fetchCategories();
      showSnackbar('Category deleted');
    } catch {
      showSnackbar('Failed to delete category', 'error');
    }
  };

  const handleEditOpen = (cat) => {
    setEditId(cat.id);
    setName(cat.name);
    setDescription(cat.description);
    setOpenEdit(true);
  };

  const handleEditSave = async () => {
    try {
      await axiosClient.put(`/categories/${editId}`, { name, description });
      setOpenEdit(false);
      setName('');
      setDescription('');
      fetchCategories();
      showSnackbar('Category updated');
    } catch {
      showSnackbar('Failed to update category', 'error');
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setFiltered(categories.filter(c =>
      c.name.toLowerCase().includes(value.toLowerCase()) ||
      c.description.toLowerCase().includes(value.toLowerCase())
    ));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="sm" style={{ marginTop: '30px' }}>
      <Typography variant="h4" gutterBottom>Categories</Typography>

      {/* Add Form */}
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
              <ListItemText primary={cat.name} secondary={cat.description} />
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
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
}