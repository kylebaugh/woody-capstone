const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());


var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: 'ad43f6c9c2c84d449bbf144e3c4f3d4c',
  captureUncaught: true,
  captureUnhandledRejections: true
});

rollbar.log("Hello world!");

const {
    getLocations,
    deleteLocation,
    createLocation,
    updateLocationTime,
  } = require("./controller");
  
app.use("/", express.static(path.join(__dirname, "./client/index.html")));
app.use(express.static(path.join(__dirname, "./client")));

app.get("/api/locations", getLocations);
app.delete("/api/locations/:id", deleteLocation);
app.post("/api/locations", createLocation);
app.put("/api/locations/:id", updateLocationTime);


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Checking in at port ${port}`));
