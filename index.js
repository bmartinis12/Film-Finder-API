// Variables 

const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const searchRoutes = require('./routes/search.route');
const trendingRoutes = require('./routes/trending.route');
const detailRoutes = require('./routes/detail.route');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// Middleware/configurations 

app.use(express.json());
app.use(helmet({
    frameguard: {
        action: 'deny'
    },
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "*.fontawesome.com", "'unsafe-inline'"],
            scriptSrc: ["'self'", "*.fontawesome.com"],
            connectSrc: ["'self'", "*.fontawesome.com"],
        },
    }
}));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());
app.use(express.static('public'));

// Routes 

app.use('/search', searchRoutes);
app.use('/trending', trendingRoutes);
app.use('/detail', detailRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);


// Database setup

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.DB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    // Load server 

    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));