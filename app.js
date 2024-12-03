const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

app.listen(5001, () => console.log('Server running on port 5001'));
