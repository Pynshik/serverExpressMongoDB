const fs = require('fs');
const { User, Photo } = require('../connection.mongoose/connection.mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class DBusersService {
    login = async (user) => {
        const _login = user.login;
        const currentUser = await User.findOne({ login: _login }, function (err, user) {
            if (err) return;
            return user;
        }
        );

        if (currentUser === undefined) return;

        const comparison = await bcrypt.compare(user.password, currentUser.password);
        if (!comparison) return;
        const token = jwt.sign({ _login }, 'server');
        return token;
    }

    existUserLogin = async (login) => {
        return await User.findOne({ login }, function (err, user) {
            if (err) return;
            return user;
        });
    }

    existId = async (id) => {
        try {
            const user = await User.findById(id);
            if (user) return true;
        } catch (err) {
            return false;
        }
    }

    getAllUsers = async (obj) => {
        try {
            const count = +obj.count;
            const skip = (+obj.page - 1) * count;
            let result = await User.aggregate([ 
                { $skip:  skip },
                { $limit: count },
                { $lookup: {
                    from: 'photos',
                    localField: 'photos',
                    foreignField: '_id',
                    as: 'photosInfo'
                    }
                },
                { $project: {
                    _id: 0,
                    photosInfo: '$photos',
                    userInfo:{
                        id: '$_id', 
                        login: '$login',
                        password: '$password',
                        name: '$name',
                        age: '$age',
                        avatar: '$avatar'
                            }}
                }
            ]);
            return {
                content: result,
                page: +obj.page,
                count: count,
                totalCount: ''
            };
        } catch (err) {
            console.log(err);
        }
    }

    getUser = async (id) => {
        const user = await User.findById(id)
            .populate({ path: 'photos', model: Photo });
        return user;
    }

    getMe = async (token) => {
        try {
            const result = jwt.verify(token, 'server');
            const _login = result._login;
            const user = await User.findOne({ login: _login });
            if (!user) throw new Error('No user');
            return user;
        } catch (error) {

        }
    }

    addUser = async (user) => {
        const userOk = { ...JSON.parse(user.userData), avatar: user.avatar };
        const hash = await bcrypt.hash(userOk.password, saltRounds);
        try {
            userOk.password = hash;
            userOk.photos = [];
            User.create(userOk, function (err, userOk) {
                if (err) return console.log(err);
                return true;
            })
        } catch (err) {
            console.log(err)
        }
    }

    updateUser = async (id, user) => {
        if (user.password) {
            bcrypt.hash(user.password, saltRounds)
                .then(hash => {
                    user.password = hash;
                })
                .catch(e => { console.log(e) })
        }
        const found = await User.findById(id, function (err, user) {
            if (err) return;
            return user;
        });
        if (!found) return false;

        if (user.avatar && found.avatar) {
            found.avatar = await fs.unlink(`./${found.avatar}`, (err) => {
                if (err) {
                    console.log(err)
                }
            });
        }

        const properties = Object.keys(user);
        properties.forEach(property => {
            found[property] = user[property];
        });

        return await User.findByIdAndUpdate(id, found, { new: true }, function (err, user) {
            if (err) return console.log(err);
            return true;
        })
    }

    deleteUser = async (id) => {
        console.log(User.findById(id, (err, res) => { console.log(res) }));
        let deletedUser = {};
        await User.findByIdAndDelete(id, function (err, deleted) {
            if (deleted) {
                deletedUser = deleted;
            }
            else {
                deletedUser = null;
            }
        })

        return deletedUser;
    }
}

module.exports = new DBusersService();
