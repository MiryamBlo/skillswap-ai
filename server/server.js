const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/api/protected', require('./middleware/authMiddleware'), (req, res) => {
    res.json({ message: `Hello ${req.user.email}, you are authorized!` });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});