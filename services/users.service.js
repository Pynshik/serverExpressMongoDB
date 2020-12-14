const fs = require('fs');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class JSONusersService {
    usersFile = JSON.parse(fs.readFileSync('./users.json', 'utf8',
        function (err, data) {
            if (err) console.log(err);
            return (data);
        }))

    login = async (user) => {
        const login = user.login;
        const currentUser = this.usersFile.find(user => {
            return login === user.login;
        });
        
        if(currentUser === undefined) return;

        const comparison = await bcrypt.compare(user.password, currentUser.password);
        if(!comparison) return;
        const token = jwt.sign({login}, 'server');
        return token;
    }

    existUserLogin = (login) => {
        return this.usersFile.find(function(user) {
            return user.login === login;
        });
    }

    existId = (id) => {
        return this.usersFile.find(function(user) {
            return user.id === id;
        });
    }

    getAllUsers = () => {
        return this.usersFile;
    }

    getUser = (id) => {
        const user = this.usersFile.find(user => {
            return user.id === id;
        })
        return user;
    }

    getMe = (token) => {
        const result = jwt.verify(token, 'server');
        return this.usersFile.find(user => {
            return result.login === user.login;
        })
    }

    addUser = (user) => {
        const userOk = {...JSON.parse(user.userData), avatar: user.avatar};
        userOk.id = uuid();
        bcrypt.hash(userOk.password, saltRounds)
            .then(hash => {
                userOk.password = hash;
                this.usersFile.push(userOk);
                fs.writeFile('./users.json', JSON.stringify(this.usersFile), function (err) {
                if (err) throw err;
            })
        return this.usersFile;
        })
        .catch(err => { console.log(err)});
    }

    updateUser = async (id, user) => {
        if(user.password){
            bcrypt.hash(user.password, saltRounds)
                .then(hash => {
                    user.password = hash;
                })
                .catch(e => {console.log(e)})
        }
    
        const found = this.usersFile.find(user => {
            return user.id === id;
        });

        if (!found) return false;

        if(user.avatar && found.avatar){
            found.avatar = await fs.unlink(`./${found.avatar}`, (err) => {
                if(err){
                    console.log(err)
                }
            });
        }

        const properties = Object.keys(user);
        properties.forEach(property => {
            found[property] = user[property];
        });

        const targetIndex = this.usersFile.indexOf(found);
        this.usersFile.splice(targetIndex, 1, found);

        await fs.writeFile('./users.json', JSON.stringify(this.usersFile), function (err) {
            if (err) throw err;
        });

        return true;
    }

    deleteUser = async (id) => {
        const found = this.usersFile.find(user => {
            return user.id === id
        });
        if (!found) return false;
        const targetIndex = this.usersFile.indexOf(found);
        this.usersFile.splice(targetIndex, 1);
        await fs.writeFile('./users.json', JSON.stringify(this.usersFile), function (err) {
            if (err) throw err;
        });
        return true;
    }

}

module.exports = new JSONusersService();
