const controller = require('../controllers/users.controller');
// const JSONusersService = require('../services/users.service.js');
const DBusersService = require('../services/dbusers.service');


const idExist = async (req, res, next) => {
    try {
        const service = controller.service;
        const existId = await service.existId(req.params.id);
        if (!existId || existId === undefined) {
            throw new Error(`User with id=${req.params.id} doesn't exist`);
        }
        next();
    } catch (err) {
        res.status(401).send(err.message);
    }
}

module.exports = idExist;