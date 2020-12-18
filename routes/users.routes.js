const express = require('express');
const router = express.Router();

const controller = require('../controllers/users.controller.js');
const controllerPhoto = require('../controllers/photos.controller');
const auth = require('../middlewares/auth.middleware');
const idExist = require('../middlewares/id.middleware.js');
const multerMiddleware = require('../middlewares/multer.middleware');
const multerPhotoMiddleware = require('../middlewares/multerPhoto.middleware');
const validate = require('../middlewares/validation.middleware.js');
const createUserScheme = require('../validation-schemes/user-create.scheme.js');
const updateUserScheme = require('../validation-schemes/user-update.scheme.js');

router
    .get('/', auth, controller.getAll)
    .get('/me', auth, controller.getMe)
    .get('/photos', auth, controllerPhoto.getAllPhotos)
    .get('/:id', auth, idExist, controller.get) /////////!!!!!!!!!!!!!!!!!!!!!!
    .post('/', multerMiddleware, validate(createUserScheme), controller.add)
    .post('/login', controller.login)
    .post('/photos', auth, multerPhotoMiddleware, controllerPhoto.addPhoto)
    .put('/photos/:id', auth, multerPhotoMiddleware, controllerPhoto.updatePhoto)
    .put('/:id', auth, idExist, multerMiddleware, validate(updateUserScheme), controller.update)
    .delete('/:id', auth, idExist, controller.delete)
    .delete('/photos/:id', auth, controllerPhoto.deletePhoto)


module.exports = router;
