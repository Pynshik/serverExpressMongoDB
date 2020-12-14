const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller.js');
const auth = require('../middlewares/auth.middleware');
const idExist = require('../middlewares/id.middleware.js');
const multerMiddleware = require('../middlewares/multer.middleware');
const validate = require('../middlewares/validation.middleware.js');
const createUserScheme = require('../validation-schemes/user-create.scheme.js');
const updateUserScheme = require('../validation-schemes/user-update.scheme.js');

router
    .get('/', auth, controller.getAll)
    .post('/', multerMiddleware, validate(createUserScheme), controller.add)
    .post('/login', controller.login)
    .get('/me', auth, controller.getMe)
    .get('/:id', auth, idExist, controller.get)
    .put('/:id', auth, idExist, multerMiddleware, validate(updateUserScheme), controller.update)
    .delete('/:id', auth, idExist, controller.delete)

module.exports = router;
