const locations = require("./db.json");
let globalId = 13;

module.exports = {
    getLocations: (req, res) => {
        res.status(200).send(locations);
      },
      deleteLocation: (req, res) => {
        let index = locations.findIndex((elem) => elem.id === +req.params.id);
        locations.splice(index, 1);
        res.status(200).send(locations);
      },
      createLocation: (req, res) => {
        const { place, description, time, rating, imageURL } = req.body;
        let newLocation = {
          id: globalId,
          place,
          description,
          time: +time,
          rating: +rating,
          imageURL,
        };
        locations.push(newLocation);
        globalId++;
        res.status(200).send(locations)
        rollbar.info("User successfully created new location");
      },
      updateLocationTime: (req, res) => {
        const { id } = req.params;
        const { type } = req.body;
        let index = locations.findIndex((elem) => +elem.id === +id);
        console.log(type);
        if (type === "minus" && locations[index].time > 1) {
          locations[index].time--;
          res.status(200).send(locations);
        } else if (type === "plus" && locations[index].time < 31) {
          locations[index].time++;
          res.status(200).send(locations);
        } else {
          res.status(400).send("Error");
          rollbar.error("Issue with updating time");
        }
        }
      }
