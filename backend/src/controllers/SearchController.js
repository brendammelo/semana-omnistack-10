const Dev = require('../models/Dev');
const parseStringAsarray = require('../utils/parseStringAsArray');



module.exports = {
    async index(request, response) {
       const { latitude, longitude, techs } = request.query;

       const techsArray = parseStringAsarray(techs);

       const devs = await Dev.find({
           techs: {
             $in: techsArray, 
           },
           location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                $maxDistance: 10000,
            },
           },
       });
//$in operador logico do mongo


 //buscar todos devs num raio de 10km
 // filtras por tecnologias
 return response.json({ devs });
    }
}