const express = require("express");
const app = express();
const mongodb = require("./data/database");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require('cors');
const dotenv = require('dotenv');
// const validation = require('../middleware/validation');
dotenv.config(); // Load environment variables from .env file 


const port = process.env.PORT || PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use sessions to maintain login state
app.use(session({ 
  secret: 'secret', //should be chaged to a random number
  resave: false, 
  saveUninitialized: true 
}))

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all domains, or specify a domain
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Z-Key'); // Allow these headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH'); // Allow these methods
  // Proceed to next middleware or route handler
  next();
});

// Enable CORS for all routes and origins
app.use(cors({methods: ["GET", "POST", "PUT", "DELETE","PATCH"]})),  // Only allow GET and POST requests
app.use(cors({origin: "*"}));

// Configure GitHub strategy
passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK
}, 
function (accessToken, refreshToken, profile, done){
  // Save the user's GitHub profile info in your database or session
  return done(null, profile);
}));

// Serialize and deserialize user information to maintain the session
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// A simple home route
app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Hello ${req.session.user.displayName} !!!` : 'You are not authenticated. Authenticate to get full access');
});
// CORS middleware to allow cross-origin requests
// Use routes defined in routes/index.js
app.use("/", require("./routes"));

// GitHub OAuth callback
app.get('/github/callback',
  passport.authenticate('github', { 
    failureRedirect: '/api-doc',
    session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Initialize the database
mongodb.initDb((err) => {
    if (err) {
      console.error("Failed to connect to MongoDB", err);
      process.exit(1); // Exit the process if the DB connection fails
    }
  
    console.log("Connected to MongoDB ...");
    // Start the server once the DB is connected
    app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  });
  