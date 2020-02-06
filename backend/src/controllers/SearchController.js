const parseStringAsArray = require("../utils/parseStringAsArray");
const Dev = require("../models/Dev");

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    // console.log(latitude, longitude);

    const techArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 100000000
        }
      }
    });

    return response.json({ devs });
  }
};
