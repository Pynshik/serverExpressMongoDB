const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller.js');
// const logPath = require('../middlewares/logPath.middlewares');

router
    .get('/', controller.getAll)
    .get('/:id', controller.get)
    .post('/', controller.add)
    .put('/:id', controller.update)
    .delete('/:id', controller.delete)



module.exports = router;