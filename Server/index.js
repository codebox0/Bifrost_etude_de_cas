// require('dotenv').config();


const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const crypto = require('crypto');
var uuid = require('uuid');
const app = express();
const variable = require('./model/variables')
const jwt = require('jsonwebtoken');
const cors = require('cors');
const {login, logout, verifToken, createUser} = require("./lib/connexion");
const {authenticateJWT, authenticateToken, verifMiddlewareToken} = require("./lib/middleware");


// Connexion Base de Données


const api = express.Router();


// App use
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    next();
});


const ServerConnexion = require('./lib/ServerConnexion');
const genModelData = require('./lib/genUserData');
const mongoose = ServerConnexion.connexion();
const findData = require('./lib/findData');


ACCESS_TOKEN_SECRET = 'swsh23hjddnns';
ACCESS_TOKEN_LIFE = 120;
REFRESH_TOKEN_SECRET = 'dhw782wujnd99ahmmakhanjkajikhiwn2n';
REFRESH_TOKEN_LIFE = 86400;


const users = [
    {
        username: 'john',
        password: 'password123admin',
        role: 'farmer'
    }, {
        username: 'anna',
        password: 'password123member',
        role: 'client'
    }
];
let refreshTokens = [];

//connexion space
// app.post('/create', createUser);
app.post('/create', (req, res, next) => {

    try {

        // Read username and password from request body
        const {username, password, role} = req.body;
        // Filter user from the users array by username and password
        let user = findData.findMongodbUserBy(mongoose);
        // let user = findData.findMongodbUserBy(mongoose, {username: username, password: password});
        // if (!user) {
        // generate an access token
        let dataUser = {
            farmerID: uuid.v1(),
            username: username,
            password: password,
            wallet: 0,
            role: role
        }
        genModelData.addUser(mongoose, dataUser);
        // user = findData.findMongodbUserBy(mongoose, user) ;
        res.json({
            dataUser
        });
        // } else {
        //     res.send('Username or password Already exist');
        // }
        next();
    } catch (e) {
        res.json({
            e
        });
    }
});

//connexion space
app.get('/user', async (req, res, next) => {
    try {
        await findData.findMongodbUser(mongoose).then(value => {
            console.log('dataUser : ', value);
            res.json({
                value
            });
        }).catch(reason => {
            console.log('Reason : ', reason);
        });
        next();
    } catch (e) {
        res.json({
            e
        });
    }
});
//connexion space

app.post('/create/offer', (req, res, next) => {

    try {

        // Read username and password from request body
        const {
            farmerID,
            fruitName,
            quantity,
            price,
            period
        } = req.body;
        // Filter user from the users array by username and password
        let user = findData.findMongodbUserBy(mongoose);
        let dataOffer = {
            offerID: uuid.v1(),
            farmerID: farmerID,
            fruitName: fruitName,
            fruitQuantity: quantity,
            fruitUnitPriceEUR: price,
            period: period,
            isSell: false,
            idBuyer: ''
        };
        genModelData.addOffer(mongoose, dataOffer);
        res.json({
            dataOffer
        });
        next();
    } catch (e) {
        console.log('error : ', e);
        res.json({
            e
        });
    }
});
// app.post('/create', createUser);

app.get('/offer/list', async (req, res, next) => {
    try {
        await finData.findMongodbOffer(mongoose).then(value => {
            console.log('dataOffer : ', value);
            res.json({
                value
            });
        }).catch(reason => {
            console.log('Reason : ', reason);
        });
        next();
    } catch (e) {
        res.json({
            e
        });
    }
});
//connexion space
app.get('/offer/list/sell', async (req, res, next) => {

    try {
        await findData.findMongodbOfferBy(mongoose, {isSell: false}).then(value => {
            console.log('dataOffer : ', value);
            res.json({
                value
            });
        }).catch(reason => {
            console.log('Reason : ', reason);
        });
        next();
    } catch (e) {
        console.log('e : ', e);
        res.json({
            e
        });
    }
});
//connexion space
app.post('/offer/buy', async (req, res, next) => {

    const offer = req.body;
    try {
        await finData.findAndUpdateMongodbOfferBy(mongoose, offer).then(value => {
            console.log('dataOffer : ', value);
            res.json({
                value
            });
        }).catch(reason => {
            console.log('Reason : ', reason);
        });
        next();
    } catch (e) {
        res.json({
            e
        });
    }
});

app.get('/offer', async (req, res, next) => {

    const {offerID} = req.body;
    try {
        await finData.findMongodbOfferBy(mongoose, {offerID}).then(value => {
            console.log('dataOffer : ', value);
            res.json({
                value
            });
        }).catch(reason => {
            console.log('Reason : ', reason);
        });
        next();
    } catch (e) {
        res.json({
            e
        });
    }
});

app.post('/offer/check', async (req, res, next) => {

    const {data} = req.body;
    try {
        await findData.findMongodbOfferBy(mongoose, {data}).then(value => {
            console.log('dataOffer : ', value);
            res.json({
                value
            });
        }).catch(reason => {
            console.log('Reason : ', reason);
        });
        next();
    } catch (e) {
        console.log('e trace : ', e);
        res.json({
            e
        });
    }
});


// app.post('/login', login);
app.post('/login', async (req, res, next) => {

    // Read username and password from request body
    const {username, password} = req.body;
    console.log("req.body : ", req.body);
    console.log("username : ", username);
    console.log("password : ", password);
    // Filter user from the users array by username and password
    await findData.findMongodbUserBy(mongoose, {username, password}).then(value => {
        console.log("value enter : ", value);
        if (value.length) {
            // generate an access token
            const accessToken = jwt.sign({
                    username: username,
                    password: password
                },
                env.ACCESS_TOKEN_SECRET,
                {expiresIn: '20m'});
            const refreshToken = jwt.sign({username: username, password: password}, env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            console.log("value : ", value);
            console.log("user access Token : ", accessToken);
            console.log("token list : ", refreshTokens);
            const client = value;

            res.json({
                accessToken,
                refreshToken,
                client
            });
            next();
        } else {
            res.send('Username or password incorrect');
            next();
        }

    })
        .catch(reason => {
            console.log(reason);
            next();
        })
    ;
});
app.post('/logout', (req, res, next) => {


    const {token} = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
    next();
});


// verification Token generation
// app.post('/token', verifToken);
//
//
//
//
//
// //verifMiddlewareToken
// app.post('/verif', authenticateJWT, verifMiddlewareToken);
// app.post('/verifier', authenticateToken, verifMiddlewareToken);
app.post('/verifier', (req, res, next) => {

    console.log('test verif all ');
    next();
});


//
// app.post('/login', login);
// app.post('/refrsh', refresh);


app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});