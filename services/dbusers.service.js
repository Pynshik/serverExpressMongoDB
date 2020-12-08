const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const User = mongoose.model("User", userScheme);

mongoose.connect('mongodb://localhost/users',  {useFindAndModify: false , useNewUrlParser: true })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));

class DBusersService {
    getAllUsers = () => {
        return User.find({}, function(err, users){
            if(err) return console.log(err);
            return users;
        })
    }

    getUser = (id) => {
        return User.findById(id, function(err, user){
        if(err) return console.log(err);
        return user;
        })
    }

    addUser = (user) => {
        User.create(user, function(err, user){
            if(err) return console.log(err);
            return true;
        })
    }

    updateUser = (id, user) => {
        return User.findByIdAndUpdate(id, user, {new:true}, function(err, user){
            if(err) return console.log(err);
            return true;
        })    
    }

    deleteUser = (id) => {
        return User.findByIdAndDelete(id, function(err, deleted){
            if(err) return console.log(err);
            return true;
        })
    }
}

module.exports = new DBusersService();