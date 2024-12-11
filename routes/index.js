const routes = require("express").Router();

// routes.use("/", require("../swagger/swagger"));

routes.get('/', (req, res) => {
  // #swagger.tags=["Hello World"]
    res.send("Home Page ...");
  });

routes.use("/student", require("./studentRoutes"));

module.exports = routes;