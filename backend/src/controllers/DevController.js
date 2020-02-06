const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async store(request, response) {
    // // Usado em DELETE and PUT
    // console.log(request.params);
    // // Usado em GET
    // console.log(request.query);
    // // Usado em POST e PUT
    // console.log(request.body);

    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `http://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
        github_username
      });

      // Filtrar as conexoes que estao no range, e que possuem alguma tech procurada.

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.send(dev);
  },

  async index(request, response) {
    const devs = await Dev.find();
    return response.send(devs);
  }
};
