const mongoose = require('mongoose');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
} = process.env;

const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
    useMongoClient: true
};

// const url  = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
// const url  = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
const url  = `mongodb://${MONGO_USERNAME}/${MONGO_DB}`

// mongoose.connect(url, {
//         useNewUrlParser: true
//     })
// mongoose.connect('mongodb://database/CaptiosusDB',options)
mongoose.connect(`mongodb://127.0.0.1:27017/bifrostdb?authSource=admin&w=1`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
} )
    .then(() => console.log('Connexion réussi à la Base de données...'))
    .catch(err => console.log('error :: ==>', err));

connexion = function connexion() {
    return mongoose;
}

exports.connexion = connexion;
/* module.exports = mongoose */