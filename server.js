const express = require("express");
const app = express();
const mongodb = require("./data/database");
const bodyParser = require("body-parser");

const PORT = 3000;
const port = process.env.PORT || PORT;

app.use(bodyParser.json());
// CORS middleware to allow cross-origin requests
// Use routes defined in routes/index.js
app.use("/", require("./routes"));

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
  