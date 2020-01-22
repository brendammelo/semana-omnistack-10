const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsarray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

//metodos do controller- index, show, store, update, destroy

//async quando tem que se esperar resposta de algo
//ver promises e JS assincrono

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username }); //vai no bd procurar username
    
        if(!dev){

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const { name = login, avatar_url, bio } = apiResponse.data;
    
        //map percorre array, trim - remove espaçamentos
    
        const techsArray = parseStringAsarray(techs);
    
        const location = {
            type: 'Point', //msm nome do point schema
            coordinates: [longitude, latitude],
        };
    
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        })

        // filtrar as conexoes que estao a no max 10km de distancia
        // e que o novo dev tenha pelo menos uma das techs filtradas

        const sendSocketMessageTo = findConnections(
            {latitude, longitude},
            techsArray,
        )
        sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        
        return response.json(dev);
    
    }
};