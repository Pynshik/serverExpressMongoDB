const JSONusersService = require('../services/users.service.js');
const DBusersService = require('../services/dbusers.service');

class UsersController{
    service = DBusersService;

    getAll = async (req, res) => {
        const users = await this.service.getAllUsers();
        res.status(200).send(users);
    }

    get = async (req, res) => {
        const user = await this.service.getUser(req.params.id); 
        if(user) {
            res.status(200).send(user);
        } else {
            res.status(404).send('Пользователя с таким id нет');
        }
    }

    add = (req, res) => {
        console.log(req.body);
        this.service.addUser(req.body);
        res.status(201).send('Пользователь добавлен');
    }

    update = (req, res) => {
        const updated = this.service.updateUser(req.params.id, req.body)
        if(updated){
            res.status(200).send('Пользователь обновлен');
        } else {
            res.status(404).send('Пользователя с таким id нет');
        }
        
    }

    delete = (req, res) => {
        const deleted = this.service.deleteUser(req.params.id);
        if(deleted){
            res.status(200).send('Пользователь удален')
        } else {
            res.status(404).send('Пользователя с таким id нет');
        }
    }

}

module.exports = new UsersController();