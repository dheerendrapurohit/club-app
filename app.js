const express = require('express');
const passport = require('./config/passport');
const session = require('express-session');
const flash = require('connect-flash');
const { sequelize } = require('./models');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const memberRoutes = require('./routes/memberRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// View Engine
app.set('view engine', 'ejs');

// Routes
app.use(authRoutes);
app.use(messageRoutes);
app.use(memberRoutes);

// Start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
