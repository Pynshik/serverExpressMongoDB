const DBphotosService = require('../services/dbphotos.service');

class PhotosController{
    service = DBphotosService;

    getAllPhotos = async (req, res) => {
        try {
            const photos = await this.service.getAllPhotos(req.query);
            res.status(200).send({
                photos: photos,
                login: req.login
            });
        } catch (error) {
            res.status(400).send(err);
        }
    }

    addPhoto = async (req, res, result) => {
        const added = await this.service.addPhoto({ photoData: req.body.data, photo: req.file.path, login:req.login});
        if(added){
            res.status(201).send('Photo has been added');
        } else{
            res.status(400).send("Photo hasn't been added");
        }
    }

    updatePhoto = async (req, res) => {
        const updated = await this.service.updatePhoto(req.params.id, {...JSON.parse(req.body.data), filepath: req.file.path, login: req.login})
        if(updated){
            res.status(200).send("Photo has been updated");
        } else {
            res.status(404).send(`Something went wrong`);
        }
        
    }

    deletePhoto = async (req, res) => {
        let deleted = await this.service.deletePhoto(req.params.id, req.login);
        if(deleted){
            res.status(200).send("Photo has been deleted")
        } else {
            res.status(404).send("Photo hasn't been deleted");
        }
    }

}

module.exports = new PhotosController();
