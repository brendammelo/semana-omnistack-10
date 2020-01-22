const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], //[] entende que ele vai armazenar um vetor
    location: {
        type: PointSchema,
        index: '2dsphere'   //utilizado para geolocalização
    }
});

module.exports = mongoose.model('Dev', DevSchema);