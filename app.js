const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');

const connectDB = require('./config/db'); // Database connection logic
const studentRoutes = require('./routes/studentRoutes');
const classRoutes = require('./routes/classRoutes');
const examRoutes = require('./routes/examRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
//const userRoutes = require('./routes/userRoutes');
//const productRoutes = require('./routes/productRoutes');
//const viewRouter = require('./routes/githubUserRoutes');
//const swaggerRouter = require('./routes/swaggerRoutes');
//const GithubUser = require('./models/githubUserModel');

// Load environment variables
// dotenv.config({ path: './config.env' });                               
dotenv.config(); // Load environment variables from .env file 
// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();
const DB = process.env.MONGODB_URI;
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.error('DB connection error:', err));

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let githubUser = await GithubUser.findOne({ githubId: profile.id });
        if (!githubUser) {
          githubUser = await GithubUser.create({
            githubId: profile.id,
            username: profile.username,
          });
        }
        return done(null, githubUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize and Deserialize Users
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await GithubUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/grades', gradeRoutes);
// app.use('/api/users', userRoutes);
// app.use('/', viewRouter);
// app.use('/', swaggerRouter);

// Error Handling Middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
});

// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
