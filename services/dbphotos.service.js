const fs = require('fs');
const {Photo, User} = require('../connection.mongoose/connection.mongoose');

class DBphotosService {
    getAllPhotos = async (obj) => {
        try{
            const options = {
                page: +obj.page,
                limit: +obj.count
            }
            return await Photo.paginate({}, options, (err,data) => {
                if(err) throw new Error('Something went wrong');
                return data;
            });
        } catch(err){
            console.log(err);
        }
    }

    addPhoto = async (data) => {
          try{
            const user = await User.findOne({login: data.login});
            if(!user) return;
            const photo = {...JSON.parse(data.photoData), filepath: data.photo};
            photo.user_id = user._id;

            const photoId = (await Photo.create(photo)).id;
            user.photos.push(photoId);

            await User.findByIdAndUpdate(user.id, user, { new: true })

            if(!photoId) {
                throw new Error("Photo hasn't been added")
            };
            return true;
        } catch(err){
            console.log(err)
        }
    }

    updatePhoto = async (id, data) => {
        try {
            const userInfo = await User.findOne({login: data.login});
            if(!userInfo) throw new Error("You are not authorized to update this photo");

            const photoInfo = await Photo.findById(id);
            if(!photoInfo) throw new Error("There is no photo with such id");

            const createByUser = userInfo.photos.includes(photoInfo.id);
            if(!createByUser){
                throw new Error("You are not authorized to delete this photo");  
            };

            if(data.filepath && photoInfo.filepath){
                photoInfo.filepath = fs.unlink(`./${photoInfo.filepath}`, (err)=>{
                    if(err) throw new Error('Photo has not been dalatad');
                });
            };
    
            const properties = Object.keys(data);
            properties.forEach(property => {
                photoInfo[property] = data[property];
            });
    
            const result = await Photo.findByIdAndUpdate(id, data, {new:true});
            if(!result) throw new Error("It isn't OK");
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    deletePhoto = async (id, _login) => {
        try {
            let deletedPhoto = {};

            const userInfo = await User.findOne({login: _login});
            if(!userInfo) throw new Error("You are not authorized to delete this photo");

            const photoInfo = await Photo.findById(id);
            if(!photoInfo) throw new Error("There is no photo with such id");

            const createByUser = userInfo.photos.includes(photoInfo.id);
            if(!createByUser){
                throw new Error("You are not authorized to delete this photo");  
            };

            const deleted = await Photo.findByIdAndDelete(id);
                if(deleted) {
                    deletedPhoto = deleted;
                }
                else {
                   throw new Error("Photo hasn't been deleted");
                }

                photoInfo.filepath = fs.unlink(`./${photoInfo.filepath}`, (err)=>{
                    if(err) throw new Error('Photo has not been dalatad');
                });

            return deletedPhoto;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new DBphotosService();
