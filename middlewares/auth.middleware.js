const jwt = require('jsonwebtoken');
const controller = require('../controllers/users.controller');
// const JSONusersService = require('../services/users.service.js');
const DBusersService = require('../services/dbusers.service');

const auth = (req, res, next) => {
    try {
        const service = controller.service;
        const [strategy, token] = req.headers['authorization'].split(' ');
        const result = jwt.verify(token, 'server');
        const exist = service.existUserLogin(result._login);
        if(exist === undefined || result._login === undefined) throw new Error("Login doesn't exist");
            req.login = result._login;
        next();
    } catch(e) {
        res.status(401).send(e.message);
    }
}

module.exports = auth;