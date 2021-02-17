const jwt = require('jsonwebtoken');
const genModelData = require('../lib/genUserData');
const findUser = require('../lib/findData');
var uuid = require('uuid');
const mongoose = require('mongoose');
// Never do this!


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

createUser = function (req, res) {
    // Read username and password from request body
    const {username, password, role} = req.body;
    // Filter user from the users array by username and password
    let user = findUser.findMongodbUserBy(mongoose);
    // let user = findUser.findMongodbUserBy(mongoose, {username: username, password: password});
    if (!user) {
        // generate an access token
        let dataUser = {
            farmerID: uuid.v1(),
            username: username,
            password: password
        }
        genModelData.addUser(mongoose, dataUser);
        user = findUser.findMongodbUserBy(mongoose, user);
        res.sendStatus(200).json({
            user
        });
    } else {
        res.send('Username or password Already exist');
    }
}


login = function (req, res) {
    // Read username and password from request body
    const {username, password} = req.body;
    // Filter user from the users array by username and password
    let user = findUser.findMongodbUserBy(mongoose);
    if (user) {
        // generate an access token
        const accessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, env.ACCESS_TOKEN_SECRET, {expiresIn: '20m'});
        const refreshToken = jwt.sign({username: user.username, role: user.role}, env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        console.log("token list : ", refreshTokens);
        const client = {...user, accessToken};
        res.json({
            accessToken,
            refreshToken,
            user,
            client
        });
    } else {
        res.send('Username or password incorrect');
    }
}

logout = function (req, res) {
    const {token} = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
}

verifMiddlewareToken = function (req, res) {
    const {token} = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({
            username: user.username,
            role: user.role
        }, env.ACCESS_TOKEN_SECRET, {expiresIn: '20m'});

        res.json({
            accessToken
        });
    });
}

exports.connexion = {login, logout, verifMiddlewareToken, createUser};