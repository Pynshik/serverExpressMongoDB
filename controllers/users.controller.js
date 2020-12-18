// const JSONusersService = require('../services/users.service.js');
const DBusersService = require('../services/dbusers.service');

class UsersController{
    service = DBusersService;

    login = async (req,res) => {
        const token = await this.service.login(req.body);
        if(token) {
            res.status(202).send(token);
        } else {
            res.status(401).send('Invalid login or(and) password')
        }
    }

    getAll = async (req, res) => {
        const users = await this.service.getAllUsers(req.query);
        res.status(200).send({
            users: users,
            login: req.login
        });
    }

    get = async (req, res) => {
        const user = await this.service.getUser(req.params.id); 
        if(user) {
            res.status(200).send(user);
        } else {
            res.status(404).send('Пользователя с таким id нет');
        }
    }

    getMe = async (req,res) => {
        const info = await this.service.getMe(req.headers['authorization'].split(' ')[1]);
        res.status(200).send(info);
    }

    add = (req, res) => {
        this.service.addUser({ userData: req.body.data, avatar: req.file.path});
        res.status(201).send('Пользователь добавлен');
    }

    update = async (req, res) => {
        const updated = await this.service.updateUser(req.params.id, {...JSON.parse(req.body.data), avatar: req.file.path})
        if(updated){
            res.status(200).send('Пользователь обновлен');
        } else {
            res.status(404).send('Пользователя с таким id нет');
        }
        
    }

    delete = async (req, res) => {
        let deleted = await this.service.deleteUser(req.params.id);
        if(deleted){
            res.status(200).send('Пользователь удален')
        } else {
            res.status(404).send('Пользователя с таким id нет');
        }
    }

}

module.exports = new UsersController();
